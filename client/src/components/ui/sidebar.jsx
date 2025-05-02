import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { PanelLeft, ChevronRight, ChevronDown, Search, X } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";
import { useIsMobile } from "@/hooks/use-mobile";

// Constants
const SIDEBAR_WIDTH = "var(--sidebar-width, 240px)";
const SIDEBAR_WIDTH_ICON = "var(--sidebar-width-icon, 48px)";

// Create Sidebar Context
const SidebarContext = React.createContext(null);

// Custom hook to use sidebar context
function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
}

// Sidebar Provider component
const SidebarProvider = React.forwardRef(
  ({ className, style, children, defaultState = "expanded", ...props }, ref) => {
    // Access mobile screen size
    const isMobile = useIsMobile();
    
    // State
    const [state, setState] = React.useState(defaultState);
    const [open, setOpen] = React.useState(true);
    const [openMobile, setOpenMobile] = React.useState(false);
    
    // Toggle sidebar function
    const toggleSidebar = React.useCallback(() => {
      if (isMobile) {
        setOpenMobile((prev) => !prev);
      } else {
        setState((prev) => (prev === "expanded" ? "collapsed" : "expanded"));
      }
    }, [isMobile]);
    
    // Handle escape key press to close mobile sidebar
    React.useEffect(() => {
      const handleKeyDown = (event) => {
        if (event.key === "Escape" && openMobile) {
          setOpenMobile(false);
        }
      };
      
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [openMobile]);
    
    // Context value
    const contextValue = {
      state,
      open,
      setOpen,
      openMobile,
      setOpenMobile,
      isMobile,
      toggleSidebar,
    };
    
    return (
      <SidebarContext.Provider value={contextValue}>
        <TooltipProvider delayDuration={0}>
          <div
            style={
              {
                "--sidebar-width": SIDEBAR_WIDTH,
                "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
                ...style,
              }
            }
            className={cn(
              "group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar",
              className
            )}
            ref={ref}
            {...props}
          >
            {children}
          </div>
        </TooltipProvider>
      </SidebarContext.Provider>
    );
  }
);
SidebarProvider.displayName = "SidebarProvider";

// Main Sidebar component
const Sidebar = React.forwardRef(
  (
    {
      side = "left",
      variant = "sidebar",
      collapsible = "offcanvas",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

    // Non-collapsible version
    if (collapsible === "none") {
      return (
        <div
          className={cn(
            "flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground",
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      );
    }

    // Mobile version (offcanvas)
    if (isMobile) {
      return (
        <>
          {/* Mobile overlay */}
          {openMobile && (
            <div
              className="fixed inset-0 z-40 bg-black/80"
              onClick={() => setOpenMobile(false)}
            />
          )}
          
          {/* Mobile sidebar */}
          <div
            className={cn(
              "fixed inset-y-0 z-50 flex w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground shadow-md transition-transform duration-300",
              side === "left" && "-left-[var(--sidebar-width)] data-[open=true]:left-0",
              side === "right" && "-right-[var(--sidebar-width)] data-[open=true]:right-0",
              className
            )}
            data-open={openMobile}
            data-variant={variant}
            data-collapsible={collapsible}
            data-side={side}
            data-state={state}
            ref={ref}
            {...props}
          >
            {children}
          </div>
        </>
      );
    }

    // Desktop version
    return (
      <div
        className={cn(
          "sticky inset-y-0 flex h-svh flex-col bg-sidebar transition-[width] duration-300",
          variant === "sidebar" && "border-r border-sidebar-border",
          variant === "floating" && "m-2 rounded-lg shadow-xl",
          variant === "inset" && "shrink-0",
          state === "expanded" && "w-[--sidebar-width]",
          state === "collapsed" && "w-[--sidebar-width-icon]",
          className
        )}
        data-variant={variant}
        data-collapsible={collapsible}
        data-side={side}
        data-state={state}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Sidebar.displayName = "Sidebar";

// Sidebar Header
const SidebarHeader = React.forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-sidebar="header"
        className={cn("sticky top-0 z-10 flex h-14 shrink-0 flex-col justify-end", className)}
        {...props}
      />
    );
  }
);
SidebarHeader.displayName = "SidebarHeader";

// Sidebar Footer
const SidebarFooter = React.forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-sidebar="footer"
        className={cn("flex flex-col gap-2 p-2", className)}
        {...props}
      />
    );
  }
);
SidebarFooter.displayName = "SidebarFooter";

// Sidebar Separator
const SidebarSeparator = React.forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <Separator
        ref={ref}
        data-sidebar="separator"
        className={cn("mx-2 w-auto bg-sidebar-border", className)}
        {...props}
      />
    );
  }
);
SidebarSeparator.displayName = "SidebarSeparator";

// Sidebar Content
const SidebarContent = React.forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-sidebar="content"
        className={cn(
          "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
          className
        )}
        {...props}
      />
    );
  }
);
SidebarContent.displayName = "SidebarContent";

// Sidebar Group
const SidebarGroup = React.forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-sidebar="group"
        className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
        {...props}
      />
    );
  }
);
SidebarGroup.displayName = "SidebarGroup";

// Sidebar Group Label
const SidebarGroupLabel = React.forwardRef(
  ({ className, ...props }, ref) => {
    const { state } = useSidebar();
    
    return (
      <div
        ref={ref}
        data-sidebar="group-label"
        data-state={state}
        className={cn(
          "flex h-6 items-center text-xs font-medium text-sidebar-muted-foreground",
          "data-[state=collapsed]:h-9 data-[state=collapsed]:justify-center",
          "group-data-[collapsible=icon]:h-9 group-data-[collapsible=icon]:justify-center",
          className
        )}
        {...props}
      />
    );
  }
);
SidebarGroupLabel.displayName = "SidebarGroupLabel";

// Sidebar Group Content
const SidebarGroupContent = React.forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-sidebar="group-content"
        className={cn("flex flex-col gap-1", className)}
        {...props}
      />
    );
  }
);
SidebarGroupContent.displayName = "SidebarGroupContent";

// Sidebar Group Action
const SidebarGroupAction = React.forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-sidebar="group-action"
        className={cn(
          "absolute right-2 top-2 text-sidebar-muted-foreground",
          "group-data-[collapsible=icon]:hidden",
          className
        )}
        {...props}
      />
    );
  }
);
SidebarGroupAction.displayName = "SidebarGroupAction";

// Sidebar Trigger
const SidebarTrigger = React.forwardRef(
  ({ className, onClick, ...props }, ref) => {
    const { toggleSidebar } = useSidebar();

    return (
      <Button
        ref={ref}
        data-sidebar="trigger"
        variant="ghost"
        size="icon"
        className={cn("h-7 w-7", className)}
        onClick={(event) => {
          onClick?.(event);
          toggleSidebar();
        }}
        {...props}
      >
        <PanelLeft />
        <span className="sr-only">Toggle Sidebar</span>
      </Button>
    );
  }
);
SidebarTrigger.displayName = "SidebarTrigger";

// Sidebar Rail
const SidebarRail = React.forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-sidebar="rail"
        className={cn(
          "group/sidebar-rail w-[--sidebar-width-icon] flex-shrink-0 overflow-hidden",
          className
        )}
        {...props}
      />
    );
  }
);
SidebarRail.displayName = "SidebarRail";

// Sidebar Inset
const SidebarInset = React.forwardRef(
  ({ className, ...props }, ref) => {
    const { state } = useSidebar();
    
    return (
      <div
        ref={ref}
        data-sidebar="inset"
        data-state={state}
        data-variant="inset"
        className={cn(
          "inset-y-0 ml-auto flex shrink-0 border-l border-sidebar-border bg-sidebar transition-[width] duration-300",
          state === "expanded" && "w-[--sidebar-width]",
          state === "collapsed" && "w-0",
          className
        )}
        {...props}
      />
    );
  }
);
SidebarInset.displayName = "SidebarInset";

// Sidebar Input
const SidebarInput = React.forwardRef(
  ({ className, suffix, onChange, value, ...props }, ref) => {
    const { state } = useSidebar();
    const [focused, setFocused] = React.useState(false);
    const [localValue, setLocalValue] = React.useState(value || "");
    
    const handleChange = (e) => {
      setLocalValue(e.target.value);
      onChange?.(e);
    };
    
    return (
      <div
        data-state={state}
        data-focused={focused}
        className={cn(
          "group relative flex h-9 items-center gap-2 rounded-md border border-transparent bg-sidebar-accent px-2 text-sidebar-accent-foreground focus-within:border-sidebar-border focus-within:ring-1 focus-within:ring-sidebar-ring",
          "data-[state=collapsed]:justify-center data-[state=collapsed]:px-0 data-[state=collapsed]:data-[focused=true]:w-[calc(var(--sidebar-width)-16px)] data-[state=collapsed]:data-[focused=true]:absolute data-[state=collapsed]:data-[focused=true]:top-0 data-[state=collapsed]:data-[focused=true]:justify-start data-[state=collapsed]:data-[focused=true]:ml-2 data-[state=collapsed]:data-[focused=true]:px-2 data-[state=collapsed]:data-[focused=true]:mt-2",
          "group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:data-[focused=true]:w-[calc(var(--sidebar-width)-16px)] group-data-[collapsible=icon]:data-[focused=true]:absolute group-data-[collapsible=icon]:data-[focused=true]:top-0 group-data-[collapsible=icon]:data-[focused=true]:justify-start group-data-[collapsible=icon]:data-[focused=true]:ml-2 group-data-[collapsible=icon]:data-[focused=true]:px-2 group-data-[collapsible=icon]:data-[focused=true]:mt-2",
          className
        )}
      >
        <Search 
          className="h-4 w-4 shrink-0 text-sidebar-accent-foreground/60" 
        />
        <Input
          ref={ref}
          value={localValue}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={cn(
            "h-full w-full border-0 bg-transparent p-0 shadow-none focus-visible:ring-0 [&::-webkit-search-cancel-button]:invert-[100%]",
            "group-data-[state=collapsed]:hidden group-data-[state=collapsed]:data-[focused=true]:block",
            "group-data-[collapsible=icon]:hidden group-data-[collapsible=icon]:data-[focused=true]:block"
          )}
          {...props}
        />
        {suffix && (
          <div
            className={cn(
              "flex shrink-0 items-center justify-center gap-1 text-xs text-sidebar-accent-foreground/60",
              "group-data-[state=collapsed]:hidden group-data-[state=collapsed]:data-[focused=true]:flex",
              "group-data-[collapsible=icon]:hidden group-data-[collapsible=icon]:data-[focused=true]:flex"
            )}
          >
            {suffix}
          </div>
        )}
        {localValue && (
          <X
            className={cn(
              "absolute right-2 hidden h-4 w-4 cursor-pointer opacity-70 hover:opacity-100",
              "group-data-[focused=true]:block"
            )}
            onClick={() => {
              setLocalValue("");
              const changeEvent = new Event("change", { bubbles: true });
              ref.current?.dispatchEvent(changeEvent);
            }}
          />
        )}
      </div>
    );
  }
);
SidebarInput.displayName = "SidebarInput";

// Sidebar Menu
const SidebarMenu = React.forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <ul
        ref={ref}
        data-sidebar="menu"
        className={cn("m-0 flex list-none flex-col gap-px", className)}
        {...props}
      />
    );
  }
);
SidebarMenu.displayName = "SidebarMenu";

// Sidebar Menu Item
const SidebarMenuItem = React.forwardRef(
  ({ className, ...props }, ref) => (
    <li
      ref={ref}
      data-sidebar="menu-item"
      className={cn("group/menu-item relative", className)}
      {...props}
    />
  )
);
SidebarMenuItem.displayName = "SidebarMenuItem";

// Sidebar Menu Button
const SidebarMenuButton = React.forwardRef(
  ({ 
    asChild = false, 
    size = "md", 
    className, 
    isActive,
    icon,
    badge,
    isCurrent,
    showExpander,
    isExpanded,
    onExpanderClick,
    ...props 
  }, ref) => {
    const { state } = useSidebar();
    const Comp = asChild ? Slot : "button";
    
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Comp
            ref={ref}
            data-sidebar="menu-button"
            data-size={size}
            data-active={isActive}
            data-current={isCurrent}
            data-state={state}
            className={cn(
              "group/sidebar-menu-button relative flex h-9 min-w-0 items-center gap-2 truncate rounded-md px-2 outline-none ring-sidebar-ring",
              "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50",
              "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
              "data-[current=true]:bg-sidebar-selected data-[current=true]:text-sidebar-selected-foreground data-[current=true]:hover:bg-sidebar-selected data-[current=true]:hover:text-sidebar-selected-foreground",
              size === "sm" && "text-xs",
              size === "md" && "text-sm",
              // When collapsed
              "data-[state=collapsed]:justify-center data-[state=collapsed]:px-0",
              "group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0",
              className
            )}
            {...props}
          >
            {icon && (
              <span 
                className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center"
                )}
              >
                {icon}
              </span>
            )}
            <span
              className={cn(
                "min-w-0 flex-1 truncate",
                "group-data-[state=collapsed]:hidden",
                "group-data-[collapsible=icon]:hidden"
              )}
            >
              {props.children}
            </span>
            {badge && (
              <span
                className={cn(
                  "ml-auto",
                  "group-data-[state=collapsed]:hidden",
                  "group-data-[collapsible=icon]:hidden"
                )}
              >
                {badge}
              </span>
            )}
            {showExpander && (
              <span
                role="button"
                tabIndex={-1}
                className={cn(
                  "ml-auto cursor-pointer",
                  "group-data-[state=collapsed]:hidden",
                  "group-data-[collapsible=icon]:hidden"
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  onExpanderClick?.(e);
                }}
              >
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4 shrink-0 text-sidebar-muted-foreground transition-transform" />
                ) : (
                  <ChevronRight className="h-4 w-4 shrink-0 text-sidebar-muted-foreground transition-transform" />
                )}
              </span>
            )}
          </Comp>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          className={cn(
            // Only show tooltip when sidebar is collapsed
            "hidden",
            "data-[state=delayed-open]:flex group-data-[state=collapsed]:data-[state=delayed-open]:flex",
            "group-data-[collapsible=icon]:data-[state=delayed-open]:flex"
          )}
        >
          <div className="flex items-center gap-2 truncate">
            <span>{props.children}</span>
            {badge && <span>{badge}</span>}
          </div>
        </TooltipContent>
      </Tooltip>
    );
  }
);
SidebarMenuButton.displayName = "SidebarMenuButton";

// Sidebar Menu Badge
const SidebarMenuBadge = React.forwardRef(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      data-sidebar="menu-badge"
      className={cn(
        "inline-flex h-fit items-center gap-1 rounded-lg border border-sidebar-border bg-sidebar-badge px-1.5 py-0.5 text-[10px] font-medium text-sidebar-badge-foreground",
        className
      )}
      {...props}
    />
  )
);
SidebarMenuBadge.displayName = "SidebarMenuBadge";

// Sidebar Menu Sub
const SidebarMenuSub = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-sidebar="menu-sub"
      className={cn(
        "group/sidebar-menu-sub flex flex-col",
        "group-data-[state=collapsed]:relative",
        "group-data-[collapsible=icon]:relative",
        className
      )}
      {...props}
    />
  )
);
SidebarMenuSub.displayName = "SidebarMenuSub";

// Sidebar Menu Sub Button
const SidebarMenuSubButton = React.forwardRef(
  ({ asChild = false, size = "md", isActive, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "a";

    return (
      <Comp
        ref={ref}
        data-sidebar="menu-sub-button"
        data-size={size}
        data-active={isActive}
        className={cn(
          "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground",
          "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
          size === "sm" && "text-xs",
          size === "md" && "text-sm",
          "group-data-[collapsible=icon]:hidden",
          className
        )}
        {...props}
      />
    );
  }
);
SidebarMenuSubButton.displayName = "SidebarMenuSubButton";

// Sidebar Menu Sub Item
const SidebarMenuSubItem = React.forwardRef(
  ({ ...props }, ref) => <li ref={ref} {...props} />
);
SidebarMenuSubItem.displayName = "SidebarMenuSubItem";

// Sidebar Menu Action
const SidebarMenuAction = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-sidebar="menu-action"
      className={cn(
        "absolute right-2 top-[9px] z-10 flex items-center justify-center text-sidebar-muted-foreground",
        "group-data-[state=collapsed]:hidden",
        "group-data-[collapsible=icon]:hidden",
        "group-hover/menu-item:opacity-100 opacity-0",
        "focus-within:opacity-100",
        className
      )}
      {...props}
    />
  )
);
SidebarMenuAction.displayName = "SidebarMenuAction";

// Sidebar Menu Skeleton
const SidebarMenuSkeleton = React.forwardRef(
  ({ className, ...props }, ref) => {
    const { state } = useSidebar();
    
    return (
      <div
        ref={ref}
        data-sidebar="menu-skeleton"
        data-state={state}
        className={cn(
          "flex size-9 items-center justify-center rounded-md px-2",
          "data-[state=expanded]:h-9 data-[state=expanded]:w-full",
          className
        )}
        {...props}
      >
        <div className="h-9 w-full animate-pulse rounded-md bg-sidebar-accent" />
      </div>
    );
  }
);
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton";

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
};