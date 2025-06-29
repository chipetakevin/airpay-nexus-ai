
import React from 'react';
import { Link } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

const HeaderNavigationMenu = () => {
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-gray-700 hover:text-blue-600 transition-colors">
            Services
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-3 p-6 w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <div className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-blue-500 to-purple-600 p-6 no-underline outline-none focus:shadow-md"
                    to="/portal?tab=deals"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium text-white">
                      Smart Deals Portal
                    </div>
                    <p className="text-sm leading-tight text-white/90">
                      AI-powered deals and instant airtime purchases
                    </p>
                  </Link>
                </NavigationMenuLink>
              </div>
              <div className="grid gap-2">
                <ListItem href="/portal?tab=registration" title="Customer Registration">
                  Join thousands of satisfied customers
                </ListItem>
                <ListItem href="/portal?tab=vendor" title="Vendor Partnership">
                  Partner with us to expand your reach
                </ListItem>
                <ListItem href="/whatsapp-assistant" title="WhatsApp Assistant">
                  24/7 AI-powered shopping assistance
                </ListItem>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-gray-700 hover:text-blue-600 transition-colors">
            Platform
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-3 p-6 w-[400px] lg:w-[500px] lg:grid-cols-2">
              <ListItem href="/devine-baas" title="Devine BaaS">
                Banking as a Service platform
              </ListItem>
              <ListItem href="/baas-platform" title="BaaS Platform">
                Enterprise banking solutions
              </ListItem>
              <ListItem href="/mvnx-baas" title="MVNX BaaS">
                Mobile virtual network exchange
              </ListItem>
              <ListItem href="/master-dashboard" title="Master Dashboard">
                Comprehensive analytics and control
              </ListItem>
              <ListItem href="/platform-dashboard" title="Platform Dashboard">
                Real-time platform monitoring
              </ListItem>
              <ListItem href="/spaza-ai" title="Spaza AI">
                AI-powered retail assistant
              </ListItem>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title: string }
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          to={href || "#"}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default HeaderNavigationMenu;
