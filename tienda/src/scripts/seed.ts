import { CreateInventoryLevelInput, ExecArgs } from "@medusajs/framework/types";
import {
  ContainerRegistrationKeys,
  Modules,
  ProductStatus,
} from "@medusajs/framework/utils";
import {
  createApiKeysWorkflow,
  createInventoryLevelsWorkflow,
  createProductCategoriesWorkflow,
  createProductsWorkflow,
  createRegionsWorkflow,
  createSalesChannelsWorkflow,
  createShippingOptionsWorkflow,
  createShippingProfilesWorkflow,
  createStockLocationsWorkflow,
  createTaxRegionsWorkflow,
  createCollectionsWorkflow,
  linkSalesChannelsToApiKeyWorkflow,
  linkSalesChannelsToStockLocationWorkflow,
  updateStoresStep,
  updateStoresWorkflow,
} from "@medusajs/medusa/core-flows";
import {
  createWorkflow,
  transform,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";

const updateStoreCurrencies = createWorkflow(
  "update-store-currencies",
  (input: {
    supported_currencies: { currency_code: string; is_default?: boolean }[];
    store_id: string;
  }) => {
    const normalizedInput = transform({ input }, (data) => {
      return {
        selector: { id: data.input.store_id },
        update: {
          supported_currencies: data.input.supported_currencies.map(
            (currency) => {
              return {
                currency_code: currency.currency_code,
                is_default: currency.is_default ?? false,
              };
            }
          ),
        },
      };
    });

    const stores = updateStoresStep(normalizedInput);

    return new WorkflowResponse(stores);
  }
);

// Helper function para buscar o crear entidades
async function findOrCreate<T>(
  entityName: string,
  listFn: () => Promise<T[]>,
  createFn: () => Promise<T>,
  logger: any
): Promise<T> {
  const existing = await listFn();
  if (existing.length > 0) {
    logger.info(`${entityName} already exists, using existing.`);
    return existing[0];
  }
  logger.info(`Creating ${entityName}...`);
  return await createFn();
}

export default async function seedDemoData({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const link = container.resolve(ContainerRegistrationKeys.LINK);
  const query = container.resolve(ContainerRegistrationKeys.QUERY);
  const fulfillmentModuleService = container.resolve(Modules.FULFILLMENT);
  const salesChannelModuleService = container.resolve(Modules.SALES_CHANNEL);
  const storeModuleService = container.resolve(Modules.STORE);

  const COUNTRY_CODE = "ar";
  const countries = [COUNTRY_CODE];

  logger.info("Seeding store data...");
  const [store] = await storeModuleService.listStores();
  
  let defaultSalesChannel = await salesChannelModuleService.listSalesChannels({
    name: "Default Sales Channel",
  });

  if (!defaultSalesChannel.length) {
    const { result: salesChannelResult } = await createSalesChannelsWorkflow(
      container
    ).run({
      input: {
        salesChannelsData: [
          {
            name: "Default Sales Channel",
          },
        ],
      },
    });
    defaultSalesChannel = salesChannelResult;
  }

  await updateStoreCurrencies(container).run({
    input: {
      store_id: store.id,
      supported_currencies: [
        {
          currency_code: "ars",
          is_default: true,
        },
      ],
    },
  });

  await updateStoresWorkflow(container).run({
    input: {
      selector: { id: store.id },
      update: {
        default_sales_channel_id: defaultSalesChannel[0].id,
      },
    },
  });
  logger.info("Finished seeding store data.");

  logger.info("Seeding region data...");
  const regionModule = container.resolve(Modules.REGION);
  const existingRegions = await regionModule.listRegions({ name: "Argentina" });

  let region;
  if (existingRegions.length > 0) {
    logger.info("Region 'Argentina' already exists, using existing region.");
    region = existingRegions[0];
  } else {
    const { result: regionResult } = await createRegionsWorkflow(container).run({
      input: {
        regions: [
          {
            name: "Argentina",
            currency_code: "ars",
            countries,
            payment_providers: ["pp_system_default"],
          },
        ],
      },
    });
    region = regionResult[0];
  }
  logger.info("Finished seeding region data.");

  logger.info("Seeding tax regions...");
  try {
    await createTaxRegionsWorkflow(container).run({
      input: countries.map((country_code) => ({
        country_code,
        provider_id: "tp_system",
      })),
    });
  } catch (error: any) {
    if (error.message?.includes('already exists')) {
      logger.info("Tax regions already exist, skipping.");
    } else {
      throw error;
    }
  }
  logger.info("Finished seeding tax regions.");

  logger.info("Seeding stock location data...");
  const stockLocationModule = container.resolve(Modules.STOCK_LOCATION);
  const existingLocations = await stockLocationModule.listStockLocations({
    name: "Almacén Argentina",
  });

  let stockLocation;
  if (existingLocations.length > 0) {
    logger.info("Stock location 'Almacén Argentina' already exists, using existing location.");
    stockLocation = existingLocations[0];
  } else {
    const { result: stockLocationResult } = await createStockLocationsWorkflow(
      container
    ).run({
      input: {
        locations: [
          {
            name: "Almacén Argentina",
            address: {
              city: "Buenos Aires",
              country_code: COUNTRY_CODE,
              address_1: "",
            },
          },
        ],
      },
    });
    stockLocation = stockLocationResult[0];
  }

  await updateStoresWorkflow(container).run({
    input: {
      selector: { id: store.id },
      update: {
        default_location_id: stockLocation.id,
      },
    },
  });

  await link.create({
    [Modules.STOCK_LOCATION]: {
      stock_location_id: stockLocation.id,
    },
    [Modules.FULFILLMENT]: {
      fulfillment_provider_id: "manual_manual",
    },
  });
  logger.info("Finished seeding stock location data.");

  logger.info("Seeding fulfillment data...");
  const shippingProfiles = await fulfillmentModuleService.listShippingProfiles({
    type: "default",
  });
  let shippingProfile = shippingProfiles.length ? shippingProfiles[0] : null;

  if (!shippingProfile) {
    const { result: shippingProfileResult } =
      await createShippingProfilesWorkflow(container).run({
        input: {
          data: [
            {
              name: "Default Shipping Profile",
              type: "default",
            },
          ],
        },
      });
    shippingProfile = shippingProfileResult[0];
  }

  let fulfillmentSet;
  try {
    fulfillmentSet = await fulfillmentModuleService.createFulfillmentSets({
      name: "Envío Argentina",
      type: "shipping",
      service_zones: [
        {
          name: "Argentina",
          geo_zones: [
            {
              country_code: COUNTRY_CODE,
              type: "country",
            },
          ],
        },
      ],
    });
  } catch (error: any) {
    if (error.message?.includes('already exists')) {
      logger.info("Fulfillment set 'Envío Argentina' already exists, using existing set.");
      const sets = await fulfillmentModuleService.listFulfillmentSets(
        { name: "Envío Argentina" },
        { relations: ["service_zones"] }
      );
      fulfillmentSet = sets[0];
    } else {
      throw error;
    }
  }

  await link.create({
    [Modules.STOCK_LOCATION]: {
      stock_location_id: stockLocation.id,
    },
    [Modules.FULFILLMENT]: {
      fulfillment_set_id: fulfillmentSet.id,
    },
  });

  // Verificar si las opciones de envío ya existen
  const existingShippingOptions = await fulfillmentModuleService.listShippingOptions({
    service_zone: fulfillmentSet.service_zones[0].id,
  });

  if (existingShippingOptions.length === 0) {
    await createShippingOptionsWorkflow(container).run({
      input: [
        {
          name: "Standard Shipping",
          price_type: "flat",
          provider_id: "manual_manual",
          service_zone_id: fulfillmentSet.service_zones[0].id,
          shipping_profile_id: shippingProfile.id,
          type: {
            label: "Standard",
            description: "Ship in 2-3 days.",
            code: "standard",
          },
          prices: [
            {
              currency_code: "ars",
              amount: 1000000,
            },
            {
              region_id: region.id,
              amount: 1000000,
            },
          ],
          rules: [
            {
              attribute: "enabled_in_store",
              value: "true",
              operator: "eq",
            },
            {
              attribute: "is_return",
              value: "false",
              operator: "eq",
            },
          ],
        },
        {
          name: "Express Shipping",
          price_type: "flat",
          provider_id: "manual_manual",
          service_zone_id: fulfillmentSet.service_zones[0].id,
          shipping_profile_id: shippingProfile.id,
          type: {
            label: "Express",
            description: "Ship in 24 hours.",
            code: "express",
          },
          prices: [
            {
              currency_code: "ars",
              amount: 2000000,
            },
            {
              region_id: region.id,
              amount: 2000000,
            },
          ],
          rules: [
            {
              attribute: "enabled_in_store",
              value: "true",
              operator: "eq",
            },
            {
              attribute: "is_return",
              value: "false",
              operator: "eq",
            },
          ],
        },
      ],
    });
  } else {
    logger.info("Shipping options already exist, skipping.");
  }
  logger.info("Finished seeding fulfillment data.");

  await linkSalesChannelsToStockLocationWorkflow(container).run({
    input: {
      id: stockLocation.id,
      add: [defaultSalesChannel[0].id],
    },
  });

  logger.info("Seeding publishable API key data...");
  const { result: publishableApiKeyResult } = await createApiKeysWorkflow(
    container
  ).run({
    input: {
      api_keys: [
        {
          title: "Webshop",
          type: "publishable",
          created_by: "",
        },
      ],
    },
  });
  const publishableApiKey = publishableApiKeyResult[0];

  await linkSalesChannelsToApiKeyWorkflow(container).run({
    input: {
      id: publishableApiKey.id,
      add: [defaultSalesChannel[0].id],
    },
  });

  console.log("\n===========================================");
  console.log("🔑 PUBLISHABLE API KEY:");
  console.log(publishableApiKey.token);
  console.log("===========================================\n");
  logger.info("Finished seeding publishable API key data.");

  logger.info("Seeding product categories...");
  const productCategoryModule = container.resolve(Modules.PRODUCT);
  const existingCategoriesCheck = await productCategoryModule.listProductCategories();

  let categoryResult: any = [];
  if (existingCategoriesCheck.length > 0) {
    logger.info("Product categories already exist, skipping category creation.");
    categoryResult = existingCategoriesCheck;
  } else {
    const { result: mainCategoryResult } = await createProductCategoriesWorkflow(
      container
    ).run({
      input: {
        product_categories: [
          {
            name: "Carteras",
            handle: "carteras",
            is_active: true,
          },
          {
            name: "Calzo",
            handle: "calzo",
            is_active: true,
          },
          {
            name: "Accesorios",
            handle: "accesorios",
            is_active: true,
          },
          {
            name: "Joyería",
            handle: "joyeria",
            is_active: true,
          },
          {
            name: "Perfumes",
            handle: "perfumes",
            is_active: true,
          },
          {
            name: "Victoria's Secret",
            handle: "victorias-secret",
            is_active: true,
          },
        ],
      },
    });

    const victoriasSecretCategory = mainCategoryResult.find(
      (cat) => cat.name === "Victoria's Secret"
    );

    if (!victoriasSecretCategory) {
      throw new Error("Victoria's Secret category not found after creation");
    }

    const { result: vsSubcategoryResult } = await createProductCategoriesWorkflow(
      container
    ).run({
      input: {
        product_categories: [
          {
            name: "Body Splash",
            handle: "vs-body-splash",
            is_active: true,
            parent_category_id: victoriasSecretCategory.id,
          },
          {
            name: "Body Lotion",
            handle: "vs-body-lotion",
            is_active: true,
            parent_category_id: victoriasSecretCategory.id,
          },
          {
            name: "Cremas",
            handle: "vs-cremas",
            is_active: true,
            parent_category_id: victoriasSecretCategory.id,
          },
        ],
      },
    });

    categoryResult = [...mainCategoryResult, ...vsSubcategoryResult];
  }
  logger.info("Finished seeding product categories.");

  logger.info("Seeding collections (brands)...");
  const existingCollections = await productCategoryModule.listProductCollections();

  let collectionResult: any = [];
  if (existingCollections.length > 0) {
    logger.info("Product collections already exist, skipping collection creation.");
    collectionResult = existingCollections;
  } else {
    const { result: collectionResultTemp } = await createCollectionsWorkflow(
      container
    ).run({
      input: {
        collections: [
          {
            title: "Balenciaga",
            handle: "balenciaga",
          },
          {
            title: "Louis Vuitton",
            handle: "louis-vuitton",
          },
          {
            title: "Coach",
            handle: "coach",
          },
          {
            title: "Gucci",
            handle: "gucci",
          },
          {
            title: "Prada",
            handle: "prada",
          },
          {
            title: "Chanel",
            handle: "chanel",
          },
          {
            title: "Dior",
            handle: "dior",
          },
          {
            title: "Hermès",
            handle: "hermes",
          },
          {
            title: "Fendi",
            handle: "fendi",
          },
          {
            title: "Versace",
            handle: "versace",
          },
          {
            title: "Victoria's Secret",
            handle: "victorias-secret",
          },
          {
            title: "Ray-Ban",
            handle: "ray-ban",
          },
          {
            title: "Miu Miu",
            handle: "miu-miu",
          },
          {
            title: "Burberry",
            handle: "burberry",
          },
          {
            title: "Tiffany & Co",
            handle: "tiffany-co",
          },
          {
            title: "Cartier",
            handle: "cartier",
          },
          {
            title: "Pandora",
            handle: "pandora",
          },
        ],
      },
    });
    collectionResult = collectionResultTemp;
  }
  logger.info("Finished seeding collections (brands).");

  // Helper functions para buscar categorías y colecciones de forma segura
  const findCategory = (name: string) => {
    const category = categoryResult.find((cat: any) => cat.name === name);
    if (!category) {
      throw new Error(`Category "${name}" not found`);
    }
    return category.id;
  };

  const findCategoryByHandle = (handle: string) => {
    const category = categoryResult.find((cat: any) => cat.handle === handle);
    if (!category) {
      throw new Error(`Category with handle "${handle}" not found`);
    }
    return category.id;
  };

  const findCollection = (title: string) => {
    const collection = collectionResult.find((col: any) => col.title === title);
    if (!collection) {
      throw new Error(`Collection "${title}" not found`);
    }
    return collection.id;
  };

  logger.info("Seeding products...");
  const productModule = container.resolve(Modules.PRODUCT);
  const existingProducts = await productModule.listProducts();

  if (existingProducts.length > 0) {
    logger.info("Products already exist, skipping product creation.");
  } else {
    await createProductsWorkflow(container).run({
      input: {
        products: [
          // ========== CARTERAS ==========
          {
            title: "Cartera Balenciaga City Bag Negro",
            category_ids: [findCategory("Carteras")],
            collection_id: findCollection("Balenciaga"),
            metadata: {
              brand: "Balenciaga",
              model: "City Bag",
              material: "Cuero genuino",
              color: "Negro",
              condition: "Nuevo",
            },
            description:
              "Icónica cartera Balenciaga City Bag en cuero negro. Diseño atemporal y elegante perfecto para cualquier ocasión. Incluye dust bag y tarjeta de autenticidad.",
            handle: "cartera-balenciaga-city-bag-negro",
            weight: 800,
            status: ProductStatus.PUBLISHED,
            shipping_profile_id: shippingProfile.id,
            images: [
              {
                url: "https://via.placeholder.com/800x800/000000/FFFFFF/?text=Balenciaga+City+Bag",
              },
            ],
            variants: [
              {
                title: "Default",
                sku: "BALENCIAGA-CITY-BAG-001",
                prices: [
                  {
                    amount: 200000000,
                    currency_code: "ars",
                  },
                ],
              },
            ],
            sales_channels: [
              {
                id: defaultSalesChannel[0].id,
              },
            ],
          },
          {
            title: "Cartera Louis Vuitton Speedy 30 Monogram",
            category_ids: [findCategory("Carteras")],
            collection_id: findCollection("Louis Vuitton"),
            metadata: {
              brand: "Louis Vuitton",
              model: "Speedy 30",
              material: "Lona monogram",
              color: "Monogram clásico",
              condition: "Nuevo",
            },
            description:
              "Clásica cartera Louis Vuitton Speedy 30 con el icónico estampado monogram. Espaciosa y versátil, perfecta para el día a día o viajes.",
            handle: "cartera-louis-vuitton-speedy-30-monogram",
            weight: 600,
            status: ProductStatus.PUBLISHED,
            shipping_profile_id: shippingProfile.id,
            images: [
              {
                url: "https://via.placeholder.com/800x800/8B4513/FFFFFF/?text=LV+Speedy+30",
              },
            ],
            variants: [
              {
                title: "Default",
                sku: "LV-SPEEDY-30-001",
                prices: [
                  {
                    amount: 130000000,
                    currency_code: "ars",
                  },
                ],
              },
            ],
            sales_channels: [
              {
                id: defaultSalesChannel[0].id,
              },
            ],
          },
          {
            title: "Cartera Coach Tabby 26 Camel",
            category_ids: [findCategory("Carteras")],
            collection_id: findCollection("Coach"),
            metadata: {
              brand: "Coach",
              model: "Tabby 26",
              material: "Cuero suave",
              color: "Camel",
              condition: "Nuevo",
            },
            description:
              "Elegante cartera Coach Tabby 26 en tono camel. Diseño moderno con cierre metálico característico. Perfecta para uso diario.",
            handle: "cartera-coach-tabby-26-camel",
            weight: 500,
            status: ProductStatus.PUBLISHED,
            shipping_profile_id: shippingProfile.id,
            images: [
              {
                url: "https://via.placeholder.com/800x800/C19A6B/FFFFFF/?text=Coach+Tabby+26",
              },
            ],
            variants: [
              {
                title: "Default",
                sku: "COACH-TABBY-26-001",
                prices: [
                  {
                    amount: 38000000,
                    currency_code: "ars",
                  },
                ],
              },
            ],
            sales_channels: [
              {
                id: defaultSalesChannel[0].id,
              },
            ],
          },
          {
            title: "Cartera Gucci Marmont Rojo",
            category_ids: [findCategory("Carteras")],
            collection_id: findCollection("Gucci"),
            metadata: {
              brand: "Gucci",
              model: "GG Marmont",
              material: "Cuero matelassé",
              color: "Rojo",
              condition: "Nuevo",
            },
            description:
              "Sofisticada cartera Gucci Marmont en cuero matelassé rojo con la icónica doble G. Elegancia italiana en estado puro.",
            handle: "cartera-gucci-marmont-rojo",
            weight: 700,
            status: ProductStatus.PUBLISHED,
            shipping_profile_id: shippingProfile.id,
            images: [
              {
                url: "https://via.placeholder.com/800x800/DC143C/FFFFFF/?text=Gucci+Marmont",
              },
            ],
            variants: [
              {
                title: "Default",
                sku: "GUCCI-MARMONT-001",
                prices: [
                  {
                    amount: 210000000,
                    currency_code: "ars",
                  },
                ],
              },
            ],
            sales_channels: [
              {
                id: defaultSalesChannel[0].id,
              },
            ],
          },
          {
            title: "Cartera Prada Galleria Negro",
            category_ids: [findCategory("Carteras")],
            collection_id: findCollection("Prada"),
            metadata: {
              brand: "Prada",
              model: "Galleria",
              material: "Saffiano leather",
              color: "Negro",
              condition: "Nuevo",
            },
            description:
              "Elegante cartera Prada Galleria en cuero Saffiano negro. Símbolo de sofisticación y calidad italiana. Incluye correa removible.",
            handle: "cartera-prada-galleria-negro",
            weight: 850,
            status: ProductStatus.PUBLISHED,
            shipping_profile_id: shippingProfile.id,
            images: [
              {
                url: "https://via.placeholder.com/800x800/000000/FFFFFF/?text=Prada+Galleria",
              },
            ],
            variants: [
              {
                title: "Default",
                sku: "PRADA-GALLERIA-001",
                prices: [
                  {
                    amount: 250000000,
                    currency_code: "ars",
                  },
                ],
              },
            ],
            sales_channels: [
              {
                id: defaultSalesChannel[0].id,
              },
            ],
          },
          {
            title: "Cartera Hermès Birkin Inspired Beige",
            category_ids: [findCategory("Carteras")],
            collection_id: findCollection("Hermès"),
            metadata: {
              brand: "Hermès",
              model: "Birkin Style",
              material: "Cuero premium",
              color: "Beige",
              condition: "Nuevo",
            },
            description:
              "Lujosa cartera estilo Birkin en tono beige. Máxima calidad y exclusividad. La inversión perfecta en moda atemporal.",
            handle: "cartera-hermes-birkin-beige",
            weight: 1000,
            status: ProductStatus.PUBLISHED,
            shipping_profile_id: shippingProfile.id,
            images: [
              {
                url: "https://via.placeholder.com/800x800/F5F5DC/000000/?text=Hermes+Birkin",
              },
            ],
            variants: [
              {
                title: "Default",
                sku: "HERMES-BIRKIN-001",
                prices: [
                  {
                    amount: 920000000,
                    currency_code: "ars",
                  },
                ],
              },
            ],
            sales_channels: [
              {
                id: defaultSalesChannel[0].id,
              },
            ],
          },
          {
            title: "Cartera Fendi Baguette Marrón",
            category_ids: [findCategory("Carteras")],
            collection_id: findCollection("Fendi"),
            metadata: {
              brand: "Fendi",
              model: "Baguette",
              material: "Cuero y lona FF",
              color: "Marrón",
              condition: "Nuevo",
            },
            description:
              "Icónica cartera Fendi Baguette en marrón con logo FF. Diseño compacto y elegante, perfecto para eventos especiales.",
            handle: "cartera-fendi-baguette-marron",
            weight: 400,
            status: ProductStatus.PUBLISHED,
            shipping_profile_id: shippingProfile.id,
            images: [
              {
                url: "https://via.placeholder.com/800x800/8B4513/FFFFFF/?text=Fendi+Baguette",
              },
            ],
            variants: [
              {
                title: "Default",
                sku: "FENDI-BAGUETTE-001",
                prices: [
                  {
                    amount: 302000000,
                    currency_code: "ars",
                  },
                ],
              },
            ],
            sales_channels: [
              {
                id: defaultSalesChannel[0].id,
              },
            ],
          },
          {
            title: "Cartera Chanel Classic Flap Negro",
            category_ids: [findCategory("Carteras")],
            collection_id: findCollection("Chanel"),
            metadata: {
              brand: "Chanel",
              model: "Classic Flap",
              material: "Cuero acolchado",
              color: "Negro",
              condition: "Nuevo",
            },
            description:
              "La legendaria cartera Chanel Classic Flap en negro. Diseño atemporal con cadena dorada y logo CC. El epítome de la elegancia.",
            handle: "cartera-chanel-classic-flap-negro",
            weight: 650,
            status: ProductStatus.PUBLISHED,
            shipping_profile_id: shippingProfile.id,
            images: [
              {
                url: "https://via.placeholder.com/800x800/000000/FFFFFF/?text=Chanel+Classic+Flap",
              },
            ],
            variants: [
              {
                title: "Default",
                sku: "CHANEL-FLAP-001",
                prices: [
                  {
                    amount: 810000000,
                    currency_code: "ars",
                  },
                ],
              },
            ],
            sales_channels: [
              {
                id: defaultSalesChannel[0].id,
              },
            ],
          },

          // ========== CALZO (GAFAS) ==========
          {
            title: "Gafas Ray-Ban Aviator Dorado",
            category_ids: [findCategory("Calzo")],
            collection_id: findCollection("Ray-Ban"),
            metadata: {
              brand: "Ray-Ban",
              model: "Aviator Classic",
              material: "Metal",
              color: "Dorado con lentes verdes",
              condition: "Nuevo",
            },
            description:
              "Icónicas gafas Ray-Ban Aviator con montura dorada y lentes verdes clásicas. El estilo que nunca pasa de moda.",
            handle: "gafas-ray-ban-aviator-dorado",
            weight: 100,
            status: ProductStatus.PUBLISHED,
            shipping_profile_id: shippingProfile.id,
            images: [
              {
                url: "https://via.placeholder.com/800x800/FFD700/000000/?text=Ray-Ban+Aviator",
              },
            ],
            variants: [
              {
                title: "Default",
                sku: "RAYBAN-AVIATOR-001",
                prices: [
                  {
                    amount: 19500000,
                    currency_code: "ars",
                  },
                ],
              },
            ],
            sales_channels: [
              {
                id: defaultSalesChannel[0].id,
              },
            ],
          },
          {
            title: "Gafas Prada Cat Eye Negro",
            category_ids: [findCategory("Calzo")],
            collection_id: findCollection("Prada"),
            metadata: {
              brand: "Prada",
              model: "Cat Eye",
              material: "Acetato",
              color: "Negro",
              condition: "Nuevo",
            },
            description:
              "Sofisticadas gafas Prada estilo Cat Eye en negro. Diseño femenino y elegante con logo Prada en las patillas.",
            handle: "gafas-prada-cat-eye-negro",
            weight: 80,
            status: ProductStatus.PUBLISHED,
            shipping_profile_id: shippingProfile.id,
            images: [
              {
                url: "https://via.placeholder.com/800x800/000000/FFFFFF/?text=Prada+Cat+Eye",
              },
            ],
            variants: [
              {
                title: "Default",
                sku: "PRADA-CATEYE-001",
                prices: [
                  {
                    amount: 34500000,
                    currency_code: "ars",
                  },
                ],
              },
            ],
            sales_channels: [
              {
                id: defaultSalesChannel[0].id,
              },
            ],
          },
          {
            title: "Gafas Chanel Butterfly Perla",
            category_ids: [findCategory("Calzo")],
            collection_id: findCollection("Chanel"),
            metadata: {
              brand: "Chanel",
              model: "Butterfly",
              material: "Acetato premium",
              color: "Perla con detalles CC",
              condition: "Nuevo",
            },
            description:
              "Glamorosas gafas Chanel Butterfly con acabado perlado y logo CC en las patillas. Lujo y estilo inconfundible.",
            handle: "gafas-chanel-butterfly-perla",
            weight: 90,
            status: ProductStatus.PUBLISHED,
            shipping_profile_id: shippingProfile.id,
            images: [
              {
                url: "https://via.placeholder.com/800x800/F0EAD6/000000/?text=Chanel+Butterfly",
              },
            ],
            variants: [
              {
                title: "Default",
                sku: "CHANEL-BUTTERFLY-001",
                prices: [
                  {
                    amount: 48500000,
                    currency_code: "ars",
                  },
                ],
              },
            ],
            sales_channels: [
              {
                id: defaultSalesChannel[0].id,
              },
            ],
          },
          {
            title: "Gafas Gucci Oversized Havana",
            category_ids: [findCategory("Calzo")],
            collection_id: findCollection("Gucci"),
            metadata: {
              brand: "Gucci",
              model: "Oversized Square",
              material: "Acetato",
              color: "Havana",
              condition: "Nuevo",
            },
            description:
              "Gafas Gucci oversized en patrón Havana con logo GG en las patillas. Estilo audaz y contemporáneo.",
            handle: "gafas-gucci-oversized-havana",
            weight: 95,
            status: ProductStatus.PUBLISHED,
            shipping_profile_id: shippingProfile.id,
            images: [
              {
                url: "https://via.placeholder.com/800x800/8B4513/FFFFFF/?text=Gucci+Oversized",
              },
            ],
            variants: [
              {
                title: "Default",
                sku: "GUCCI-OVERSIZED-001",
                prices: [
                  {
                    amount: 42000000,
                    currency_code: "ars",
                  },
                ],
              },
            ],
            sales_channels: [
              {
                id: defaultSalesChannel[0].id,
              },
            ],
          },
          {
            title: "Gafas Versace Medusa Gold",
            category_ids: [findCategory("Calzo")],
            collection_id: findCollection("Versace"),
            metadata: {
              brand: "Versace",
              model: "Medusa",
              material: "Metal y acetato",
              color: "Dorado",
              condition: "Nuevo",
            },
            description:
              "Lujosas gafas Versace con logo Medusa en las patillas. Diseño extravagante y llamativo en tono dorado.",
            handle: "gafas-versace-medusa-gold",
            weight: 110,
            status: ProductStatus.PUBLISHED,
            shipping_profile_id: shippingProfile.id,
            images: [
              {
                url: "https://via.placeholder.com/800x800/FFD700/000000/?text=Versace+Medusa",
              },
            ],
            variants: [
              {
                title: "Default",
                sku: "VERSACE-MEDUSA-001",
                prices: [
                  {
                    amount: 37800000,
                    currency_code: "ars",
                  },
                ],
              },
            ],
            sales_channels: [
              {
                id: defaultSalesChannel[0].id,
              },
            ],
          },
          {
            title: "Gafas Miu Miu Retro Rosa",
            category_ids: [findCategory("Calzo")],
            collection_id: findCollection("Miu Miu"),
            metadata: {
              brand: "Miu Miu",
              model: "Retro Round",
              material: "Acetato",
              color: "Rosa pastel",
              condition: "Nuevo",
            },
            description:
              "Divertidas gafas Miu Miu estilo retro en rosa pastel. Diseño juvenil y femenino con detalles metálicos.",
            handle: "gafas-miu-miu-retro-rosa",
            weight: 75,
            status: ProductStatus.PUBLISHED,
            shipping_profile_id: shippingProfile.id,
            images: [
              {
                url: "https://via.placeholder.com/800x800/FFB6C1/000000/?text=Miu+Miu+Retro",
              },
            ],
            variants: [
              {
                title: "Default",
                sku: "MIUMIU-RETRO-001",
                prices: [
                  {
                    amount: 30200000,
                    currency_code: "ars",
                  },
                ],
              },
            ],
            sales_channels: [
              {
                id: defaultSalesChannel[0].id,
              },
            ],
          },

          // ========== PERFUMES ==========
          {
            title: "Perfume Chanel No. 5 - 50ml",
            category_ids: [findCategory("Perfumes")],
            collection_id: findCollection("Chanel"),
            metadata: {
              brand: "Chanel",
              model: "No. 5",
              volume: "50ml",
              fragrance_type: "Eau de Parfum",
              condition: "Nuevo",
            },
            description:
              "El perfume más icónico del mundo. Chanel No. 5 Eau de Parfum, fragancia atemporal y sofisticada. 50ml.",
            handle: "perfume-chanel-no-5-50ml",
            weight: 200,
            status: ProductStatus.PUBLISHED,
            shipping_profile_id: shippingProfile.id,
            images: [
              {
                url: "https://via.placeholder.com/800x800/FFD700/000000/?text=Chanel+No.5",
              },
            ],
            variants: [
              {
                title: "Default",
                sku: "CHANEL-NO5-50ML",
                prices: [
                  {
                    amount: 13000000,
                    currency_code: "ars",
                  },
                ],
              },
            ],
            sales_channels: [
              {
                id: defaultSalesChannel[0].id,
              },
            ],
          },
          {
            title: "Perfume Dior J'adore - 100ml",
            category_ids: [findCategory("Perfumes")],
            collection_id: findCollection("Dior"),
            metadata: {
              brand: "Dior",
              model: "J'adore",
              volume: "100ml",
              fragrance_type: "Eau de Parfum",
              condition: "Nuevo",
            },
            description:
              "Dior J'adore Eau de Parfum 100ml. Fragancia floral femenina y sensual. Elegancia francesa en cada gota.",
            handle: "perfume-dior-jadore-100ml",
            weight: 300,
            status: ProductStatus.PUBLISHED,
            shipping_profile_id: shippingProfile.id,
            images: [
              {
                url: "https://via.placeholder.com/800x800/FFD700/000000/?text=Dior+J'adore",
              },
            ],
            variants: [
              {
                title: "Default",
                sku: "DIOR-JADORE-100ML",
                prices: [
                  {
                    amount: 15650000,
                    currency_code: "ars",
                  },
                ],
              },
            ],
            sales_channels: [
              {
                id: defaultSalesChannel[0].id,
              },
            ],
          },
          {
            title: "Perfume Versace Bright Crystal - 90ml",
            category_ids: [findCategory("Perfumes")],
            collection_id: findCollection("Versace"),
            metadata: {
              brand: "Versace",
              model: "Bright Crystal",
              volume: "90ml",
              fragrance_type: "Eau de Toilette",
              condition: "Nuevo",
            },
            description:
              "Versace Bright Crystal 90ml. Fragancia fresca y vibrante con notas florales. Perfecta para el día.",
            handle: "perfume-versace-bright-crystal-90ml",
            weight: 280,
            status: ProductStatus.PUBLISHED,
            shipping_profile_id: shippingProfile.id,
            images: [
              {
                url: "https://via.placeholder.com/800x800/FFB6C1/000000/?text=Versace+Bright+Crystal",
              },
            ],
            variants: [
              {
                title: "Default",
                sku: "VERSACE-BRIGHT-90ML",
                prices: [
                  {
                    amount: 8100000,
                    currency_code: "ars",
                  },
                ],
              },
            ],
            sales_channels: [
              {
                id: defaultSalesChannel[0].id,
              },
            ],
          },
          {
            title: "Perfume Gucci Bloom - 100ml",
            category_ids: [findCategory("Perfumes")],
            collection_id: findCollection("Gucci"),
            metadata: {
              brand: "Gucci",
              model: "Bloom",
              volume: "100ml",
              fragrance_type: "Eau de Parfum",
              condition: "Nuevo",
            },
            description:
              "Gucci Bloom Eau de Parfum 100ml. Fragancia floral rica e intensa. Celebra la feminidad auténtica.",
            handle: "perfume-gucci-bloom-100ml",
            weight: 300,
            status: ProductStatus.PUBLISHED,
            shipping_profile_id: shippingProfile.id,
            images: [
              {
                url: "https://via.placeholder.com/800x800/FFB6C1/000000/?text=Gucci+Bloom",
              },
            ],
            variants: [
              {
                title: "Default",
                sku: "GUCCI-BLOOM-100ML",
                prices: [
                  {
                    amount: 12400000,
                    currency_code: "ars",
                  },
                ],
              },
            ],
            sales_channels: [
              {
                id: defaultSalesChannel[0].id,
              },
            ],
          },

          // ========== BODY SPLASH (Victoria's Secret) ==========
          {
            title: "Body Splash Victoria's Secret Bombshell - 250ml",
            category_ids: [findCategoryByHandle("vs-body-splash")],
            collection_id: findCollection("Victoria's Secret"),
            metadata: {
              brand: "Victoria's Secret",
              model: "Bombshell",
              volume: "250ml",
              fragrance_type: "Body Mist",
              condition: "Nuevo",
            },
            description:
              "Body Splash Victoria's Secret Bombshell 250ml. Fragancia fresca y seductora con notas florales y frutales. Perfecto para el día a día.",
            handle: "body-splash-vs-bombshell-250ml",
            weight: 300,
            status: ProductStatus.PUBLISHED,
            shipping_profile_id: shippingProfile.id,
            images: [
              {
                url: "https://via.placeholder.com/800x800/FF1493/FFFFFF/?text=VS+Bombshell",
              },
            ],
            variants: [
              {
                title: "Default",
                sku: "VS-BOMBSHELL-250ML",
                prices: [
                  {
                    amount: 2700000,
                    currency_code: "ars",
                  },
                ],
              },
            ],
            sales_channels: [
              {
                id: defaultSalesChannel[0].id,
              },
            ],
          },
          {
            title: "Body Splash Victoria's Secret Bare Vanilla - 250ml",
            category_ids: [findCategoryByHandle("vs-body-splash")],
            collection_id: findCollection("Victoria's Secret"),
            metadata: {
              brand: "Victoria's Secret",
              model: "Bare Vanilla",
              volume: "250ml",
              fragrance_type: "Body Mist",
              condition: "Nuevo",
            },
            description:
              "Body Splash Victoria's Secret Bare Vanilla 250ml. Aroma dulce y cremoso de vainilla. Sensación de suavidad todo el día.",
            handle: "body-splash-vs-bare-vanilla-250ml",
            weight: 300,
            status: ProductStatus.PUBLISHED,
            shipping_profile_id: shippingProfile.id,
            images: [
              {
                url: "https://via.placeholder.com/800x800/F5DEB3/000000/?text=VS+Bare+Vanilla",
              },
            ],
            variants: [
              {
                title: "Default",
                sku: "VS-VANILLA-250ML",
                prices: [
                  {
                    amount: 2700000,
                    currency_code: "ars",
                  },
                ],
              },
            ],
            sales_channels: [
              {
                id: defaultSalesChannel[0].id,
              },
            ],
          },
          {
            title: "Body Splash Victoria's Secret Love Spell - 250ml",
            category_ids: [findCategoryByHandle("vs-body-splash")],
            collection_id: findCollection("Victoria's Secret"),
            metadata: {
              brand: "Victoria's Secret",
              model: "Love Spell",
              volume: "250ml",
              fragrance_type: "Body Mist",
              condition: "Nuevo",
            },
            description:
              "Body Splash Victoria's Secret Love Spell 250ml. Combinación de durazno y flor de cerezo. Fragancia romántica y juvenil.",
            handle: "body-splash-vs-love-spell-250ml",
            weight: 300,
            status: ProductStatus.PUBLISHED,
            shipping_profile_id: shippingProfile.id,
            images: [
              {
                url: "https://via.placeholder.com/800x800/FFB6C1/000000/?text=VS+Love+Spell",
              },
            ],
            variants: [
              {
                title: "Default",
                sku: "VS-LOVESPELL-250ML",
                prices: [
                  {
                    amount: 2700000,
                    currency_code: "ars",
                  },
                ],
              },
            ],
            sales_channels: [
              {
                id: defaultSalesChannel[0].id,
              },
            ],
          },

          // ========== ACCESORIOS ==========
          {
            title: "Cinturón Hermès H Reversible Negro/Marrón",
            category_ids: [findCategory("Accesorios")],
            collection_id: findCollection("Hermès"),
            metadata: {
              brand: "Hermès",
              model: "H Belt",
              material: "Cuero reversible",
              color: "Negro/Marrón",
              condition: "Nuevo",
            },
            description:
              "Elegante cinturón Hermès reversible con hebilla H en oro. Cuero de máxima calidad en negro y marrón. Versátil y atemporal.",
            handle: "cinturon-hermes-h-reversible",
            weight: 300,
            status: ProductStatus.PUBLISHED,
            shipping_profile_id: shippingProfile.id,
            images: [
              {
                url: "https://via.placeholder.com/800x800/000000/FFFFFF/?text=Hermes+H+Belt",
              },
            ],
            variants: [
              {
                title: "Default",
                sku: "HERMES-BELT-001",
                prices: [
                  {
                    amount: 91800000,
                    currency_code: "ars",
                  },
                ],
              },
            ],
            sales_channels: [
              {
                id: defaultSalesChannel[0].id,
              },
            ],
          },
          {
            title: "Pañuelo Gucci GG Seda Beige",
            category_ids: [findCategory("Accesorios")],
            collection_id: findCollection("Gucci"),
            metadata: {
              brand: "Gucci",
              model: "GG Silk Scarf",
              material: "Seda 100%",
              color: "Beige con logo GG",
              condition: "Nuevo",
            },
            description:
              "Lujoso pañuelo Gucci en seda pura con estampado GG clásico. Perfecto para el cuello o como accesorio de cartera. 90x90cm.",
            handle: "panuelo-gucci-gg-seda-beige",
            weight: 100,
            status: ProductStatus.PUBLISHED,
            shipping_profile_id: shippingProfile.id,
            images: [
              {
                url: "https://via.placeholder.com/800x800/F5F5DC/000000/?text=Gucci+GG+Scarf",
              },
            ],
            variants: [
              {
                title: "Default",
                sku: "GUCCI-SCARF-001",
                prices: [
                  {
                    amount: 34500000,
                    currency_code: "ars",
                  },
                ],
              },
            ],
            sales_channels: [
              {
                id: defaultSalesChannel[0].id,
              },
            ],
          },
          {
            title: "Llavero Louis Vuitton Monogram",
            category_ids: [findCategory("Accesorios")],
            collection_id: findCollection("Louis Vuitton"),
            metadata: {
              brand: "Louis Vuitton",
              model: "Key Holder",
              material: "Lona monogram y cuero",
              color: "Monogram clásico",
              condition: "Nuevo",
            },
            description:
              "Elegante llavero Louis Vuitton con estampado monogram clásico. Combina funcionalidad con estilo. Incluye argolla metálica dorada.",
            handle: "llavero-louis-vuitton-monogram",
            weight: 50,
            status: ProductStatus.PUBLISHED,
            shipping_profile_id: shippingProfile.id,
            images: [
              {
                url: "https://via.placeholder.com/800x800/8B4513/FFFFFF/?text=LV+Key+Holder",
              },
            ],
            variants: [
              {
                title: "Default",
                sku: "LV-KEYRING-001",
                prices: [
                  {
                    amount: 31300000,
                    currency_code: "ars",
                  },
                ],
              },
            ],
            sales_channels: [
              {
                id: defaultSalesChannel[0].id,
              },
            ],
          },
          {
            title: "Bufanda Burberry Check Cashmere",
            category_ids: [findCategory("Accesorios")],
            collection_id: findCollection("Burberry"),
            metadata: {
              brand: "Burberry",
              model: "Classic Check",
              material: "Cashmere 100%",
              color: "Camel check",
              condition: "Nuevo",
            },
            description:
              "Clásica bufanda Burberry en cashmere con el icónico patrón check. Suave, cálida y elegante. Imprescindible de invierno.",
            handle: "bufanda-burberry-check-cashmere",
            weight: 200,
            status: ProductStatus.PUBLISHED,
            shipping_profile_id: shippingProfile.id,
            images: [
              {
                url: "https://via.placeholder.com/800x800/C19A6B/000000/?text=Burberry+Check",
              },
            ],
            variants: [
              {
                title: "Default",
                sku: "BURBERRY-SCARF-001",
                prices: [
                  {
                    amount: 48600000,
                    currency_code: "ars",
                  },
                ],
              },
            ],
            sales_channels: [
              {
                id: defaultSalesChannel[0].id,
              },
            ],
          },

          // ========== JOYERÍA ==========
          {
            title: "Collar Tiffany & Co Heart Tag Plata",
            category_ids: [findCategory("Joyería")],
            collection_id: findCollection("Tiffany & Co"),
            metadata: {
              brand: "Tiffany & Co",
              model: "Heart Tag",
              material: "Plata 925",
              color: "Plata",
              condition: "Nuevo",
            },
            description:
              "Icónico collar Tiffany con dije de corazón en plata 925. Diseño clásico y romántico. Incluye cadena ajustable y caja azul Tiffany.",
            handle: "collar-tiffany-heart-tag-plata",
            weight: 50,
            status: ProductStatus.PUBLISHED,
            shipping_profile_id: shippingProfile.id,
            images: [
              {
                url: "https://via.placeholder.com/800x800/C0C0C0/000000/?text=Tiffany+Heart+Tag",
              },
            ],
            variants: [
              {
                title: "Default",
                sku: "TIFFANY-HEART-001",
                prices: [
                  {
                    amount: 23700000,
                    currency_code: "ars",
                  },
                ],
              },
            ],
            sales_channels: [
              {
                id: defaultSalesChannel[0].id,
              },
            ],
          },
          {
            title: "Pulsera Cartier Love Oro Rosa",
            category_ids: [findCategory("Joyería")],
            collection_id: findCollection("Cartier"),
            metadata: {
              brand: "Cartier",
              model: "Love Bracelet",
              material: "Oro rosa 18k",
              color: "Oro rosa",
              condition: "Nuevo",
            },
            description:
              "Legendaria pulsera Cartier Love en oro rosa 18k. Símbolo de amor eterno con diseño de tornillos. Incluye destornillador y certificado.",
            handle: "pulsera-cartier-love-oro-rosa",
            weight: 80,
            status: ProductStatus.PUBLISHED,
            shipping_profile_id: shippingProfile.id,
            images: [
              {
                url: "https://via.placeholder.com/800x800/E0BFB8/000000/?text=Cartier+Love",
              },
            ],
            variants: [
              {
                title: "Default",
                sku: "CARTIER-LOVE-001",
                prices: [
                  {
                    amount: 702000000,
                    currency_code: "ars",
                  },
                ],
              },
            ],
            sales_channels: [
              {
                id: defaultSalesChannel[0].id,
              },
            ],
          },
          {
            title: "Aretes Pandora Drops Circonita",
            category_ids: [findCategory("Joyería")],
            collection_id: findCollection("Pandora"),
            metadata: {
              brand: "Pandora",
              model: "Drops",
              material: "Plata 925 con circonitas",
              color: "Plata",
              condition: "Nuevo",
            },
            description:
              "Elegantes aretes Pandora con diseño de gota y circonitas brillantes. Plata 925 de alta calidad. Perfectos para ocasiones especiales.",
            handle: "aretes-pandora-drops-circonita",
            weight: 30,
            status: ProductStatus.PUBLISHED,
            shipping_profile_id: shippingProfile.id,
            images: [
              {
                url: "https://via.placeholder.com/800x800/C0C0C0/000000/?text=Pandora+Drops",
              },
            ],
            variants: [
              {
                title: "Default",
                sku: "PANDORA-DROPS-001",
                prices: [
                  {
                    amount: 9180000,
                    currency_code: "ars",
                  },
                ],
              },
            ],
            sales_channels: [
              {
                id: defaultSalesChannel[0].id,
              },
            ],
          },
        ],
      },
    });
    logger.info("Finished seeding products.");
  }

  logger.info("Seeding inventory levels...");
  const { data: inventoryItems } = await query.graph({
    entity: "inventory_item",
    fields: ["id"],
  });

  const inventoryLevels: CreateInventoryLevelInput[] = [];
  for (const inventoryItem of inventoryItems) {
    const inventoryLevel = {
      location_id: stockLocation.id,
      stocked_quantity: 100, // Cantidad realista
      inventory_item_id: inventoryItem.id,
    };
    inventoryLevels.push(inventoryLevel);
  }

  await createInventoryLevelsWorkflow(container).run({
    input: {
      inventory_levels: inventoryLevels,
    },
  });
  logger.info("Finished seeding inventory levels.");
}
