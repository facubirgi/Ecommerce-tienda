"use client"

import { Popover, PopoverPanel, Transition } from "@headlessui/react"
import { ArrowRightMini, XMark } from "@medusajs/icons"
import { Text, clx, useToggleState } from "@medusajs/ui"
import { Fragment, useState, useEffect } from "react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CountrySelect from "../country-select"
import { HttpTypes } from "@medusajs/types"
import ChevronDown from "@modules/common/icons/chevron-down"
import Hamburger from "@modules/common/icons/hamburger"
import Home from "@modules/common/icons/home"
import ShoppingBag from "@modules/common/icons/shopping-bag"
import Info from "@modules/common/icons/info"
import Refresh from "@modules/common/icons/refresh"

const SideMenuItems = [
  { name: "Inicio", href: "/", icon: Home },
  {
    name: "Productos",
    href: "/store",
    icon: ShoppingBag,
    hasSubmenu: true,
    submenu: [
      {
        category: "CARTERAS",
        items: [
          { label: "Zadig & Voltaire", href: "/collections/zadic&voltaire" },
          { label: "Prada", href: "/collections/prada" },
          { label: "Coach", href: "/collections/coach" },
          { label: "Louis Vuitton", href: "/collections/louisvuitton" },
          { label: "Lacoste", href: "/collections/lacoste" },
          { label: "Balenciaga", href: "/collections/balenciaga" },
          { label: "Miu Miu", href: "/collections/miu-miu" },
          { label: "Zara", href: "/collections/zara" },
          { label: "Yves Saint Laurent", href: "/collections/yvessaintlaurent" },
          { label: "Tommy Hilfiger", href: "/collections/tommyhilfiger" },
        ],
        verTodo: { label: "VER TODO CARTERAS", href: "/categories/carteras" },
      },
      {
        category: "GAFAS",
        items: [],
        verTodo: { label: "VER TODO GAFAS", href: "/categories/gafas" },
      },
      {
        category: "VICTORIA'S SECRET",
        items: [
          { label: "Body Splash", href: "/collections/bodysplash" },
          { label: "Body Lotion", href: "/collections/bodylotion" },
        ],
        verTodo: { label: "VER TODO VS", href: "/collections/victoria-secret" },
      },
    ]
  },
  { name: "Quienes Somos", href: "/about", icon: Info },
  { name: "Política de Cambio", href: "/returns", icon: Refresh },
]

const BottomMenuItems = [
  { name: "Carrito", href: "/cart", icon: ShoppingBag },
]

const SideMenu = ({ regions }: { regions: HttpTypes.StoreRegion[] | null }) => {
  const toggleState = useToggleState()
  const [isProductsOpen, setIsProductsOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Reset products submenu when menu closes
  useEffect(() => {
    if (!isMenuOpen && isProductsOpen) {
      setIsProductsOpen(false)
    }
  }, [isMenuOpen, isProductsOpen])

  return (
    <div className="h-full">
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          {({ open, close }) => {
            // Track menu open state
            if (open !== isMenuOpen) {
              setIsMenuOpen(open)
            }

            return (
            <>
              <div className="relative flex h-full">
                <Popover.Button
                  data-testid="nav-menu-button"
                  className="relative h-full flex items-center gap-2 transition-all ease-out duration-200 focus:outline-none hover:text-ui-fg-base"
                >
                  <Hamburger size="20" />
                </Popover.Button>
              </div>

              {open && (
                <div
                  className="fixed inset-0 z-[50] bg-black/0 pointer-events-auto"
                  onClick={close}
                  data-testid="side-menu-backdrop"
                />
              )}

              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-150"
                enterFrom="opacity-0"
                enterTo="opacity-100 backdrop-blur-2xl"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 backdrop-blur-2xl"
                leaveTo="opacity-0"
              >
                <PopoverPanel className="flex flex-col absolute w-full pr-4 sm:pr-0 sm:w-1/3 2xl:w-1/4 sm:min-w-min h-[calc(100vh-1rem)] z-[51] inset-x-0 text-sm text-ui-fg-on-color m-2 backdrop-blur-2xl">
                  <div
                    data-testid="nav-menu-popup"
                    className="flex flex-col h-full bg-white shadow-2xl rounded-md overflow-hidden"
                  >
                    <div className="flex justify-between items-center p-6 border-b border-gray-200" id="xmark">
                      <h2 className="font-serif text-xl tracking-wider text-black">MENU</h2>
                      <button
                        data-testid="close-menu-button"
                        onClick={close}
                        className="hover:text-gray-600 transition-colors"
                      >
                        <XMark />
                      </button>
                    </div>
                    <div className="flex-1 overflow-y-auto px-6 py-4">
                      <ul className="flex flex-col gap-2 items-start justify-start">
                        {SideMenuItems.map((item) => {
                          const Icon = item.icon
                          return (
                            <li key={item.name} className="w-full">
                              {item.hasSubmenu ? (
                                <>
                                  <button
                                    onClick={() => setIsProductsOpen(!isProductsOpen)}
                                    className="text-base font-serif tracking-wide text-gray-800 hover:text-black flex items-center gap-3 w-full text-left py-3 px-4 rounded-md hover:bg-gray-50 transition-all"
                                    data-testid={`${item.name.toLowerCase()}-button`}
                                  >
                                    <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                                      {Icon && <Icon size="20" />}
                                    </div>
                                    <span className="flex-1 uppercase">{item.name}</span>
                                    <ChevronDown
                                      size="16"
                                      className={`transition-transform duration-200 ${
                                        isProductsOpen ? 'rotate-180' : ''
                                      }`}
                                    />
                                  </button>

                                  {isProductsOpen && item.submenu && (
                                    <div className="mt-2 ml-10 space-y-4 pb-2">
                                      {item.submenu.map((section, index) => (
                                        <div key={section.category}>
                                          {index > 0 && (
                                            <div className="border-t border-gray-200 my-4"></div>
                                          )}

                                          <h3 className="text-xs tracking-[0.15em] text-gray-900 mb-2 uppercase font-medium font-serif">
                                            {section.category}
                                          </h3>

                                          <div className="space-y-1.5">
                                            {section.items.map((subItem) => (
                                              <LocalizedClientLink
                                                key={subItem.label}
                                                href={subItem.href}
                                                className="block text-sm text-gray-600 hover:text-black transition-colors py-1.5 px-2 rounded hover:bg-gray-50"
                                                onClick={close}
                                              >
                                                {subItem.label}
                                              </LocalizedClientLink>
                                            ))}

                                            <LocalizedClientLink
                                              href={section.verTodo.href}
                                              className="block text-sm text-black hover:text-gray-600 transition-colors mt-2 font-medium py-1.5 px-2 rounded hover:bg-gray-50"
                                              onClick={close}
                                            >
                                              {section.verTodo.label}
                                            </LocalizedClientLink>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </>
                              ) : (
                                <LocalizedClientLink
                                  href={item.href}
                                  className="text-base font-serif tracking-wide text-gray-800 hover:text-black flex items-center gap-3 w-full py-3 px-4 rounded-md hover:bg-gray-50 transition-all uppercase"
                                  onClick={close}
                                  data-testid={`${item.name.toLowerCase()}-link`}
                                >
                                  <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                                    {Icon && <Icon size="20" />}
                                  </div>
                                  <span>{item.name}</span>
                                </LocalizedClientLink>
                              )}
                            </li>
                          )
                        })}

                        <li className="border-t border-gray-200 w-full my-2"></li>

                        {BottomMenuItems.map((item) => {
                          const Icon = item.icon
                          return (
                            <li key={item.name}>
                              <LocalizedClientLink
                                href={item.href}
                                className="text-base font-serif tracking-wide text-gray-800 hover:text-black flex items-center gap-3 w-full py-3 px-4 rounded-md hover:bg-gray-50 transition-all uppercase"
                                onClick={close}
                                data-testid={`${item.name.toLowerCase()}-link`}
                              >
                                <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                                  {Icon && <Icon size="20" />}
                                </div>
                                <span>{item.name}</span>
                              </LocalizedClientLink>
                            </li>
                          )
                        })}
                      </ul>
                    </div>

                    <div className="flex flex-col gap-y-4 p-6 border-t border-gray-200 bg-gray-50">
                      <div
                        className="flex justify-between items-center"
                        onMouseEnter={toggleState.open}
                        onMouseLeave={toggleState.close}
                      >
                        {regions && (
                          <CountrySelect
                            toggleState={toggleState}
                            regions={regions}
                          />
                        )}
                        <ArrowRightMini
                          className={clx(
                            "transition-transform duration-150 text-gray-600",
                            toggleState.state ? "-rotate-90" : ""
                          )}
                        />
                      </div>
                      <Text className="text-xs text-gray-500 text-center">
                        © {new Date().getFullYear()} Store by Pauli. All rights reserved.
                      </Text>
                    </div>
                  </div>
                </PopoverPanel>
              </Transition>
            </>
            )
          }}
        </Popover>
      </div>
    </div>
  )
}

export default SideMenu
