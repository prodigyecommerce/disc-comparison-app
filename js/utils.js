// Utility function to merge CSS classes (mimics clsx + tailwind-merge)
function cn(...classes) {
    return classes
        .filter(Boolean)
        .join(' ')
        .split(' ')
        .filter((cls, index, arr) => {
            // Basic deduplication - keep the last occurrence of each class
            const lastIndex = arr.lastIndexOf(cls);
            return index === lastIndex;
        })
        .join(' ');
}

// Component class definitions inspired by Shadcn
const componentClasses = {
    card: {
        base: "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        header: "grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6",
        title: "leading-none font-semibold",
        description: "text-muted-foreground text-sm",
        content: "px-6",
        footer: "flex items-center px-6"
    },
    button: {
        base: "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        variants: {
            default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
            destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
            outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
            secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            link: "text-primary underline-offset-4 hover:underline"
        },
        sizes: {
            default: "h-9 px-4 py-2",
            sm: "h-8 rounded-md px-3 text-xs",
            lg: "h-10 rounded-md px-8",
            icon: "h-9 w-9"
        }
    },
    input: {
        base: "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
    },
    badge: {
        base: "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variants: {
            default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
            secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
            destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
            outline: "text-foreground"
        }
    },
    separator: {
        base: "shrink-0 bg-border",
        horizontal: "h-[1px] w-full",
        vertical: "h-full w-[1px]"
    }
};

// Helper functions to create component classes
function createButtonClass(variant = 'default', size = 'default', className = '') {
    return cn(
        componentClasses.button.base,
        componentClasses.button.variants[variant],
        componentClasses.button.sizes[size],
        className
    );
}

function createCardClass(part = 'base', className = '') {
    return cn(componentClasses.card[part], className);
}

function createInputClass(className = '') {
    return cn(componentClasses.input.base, className);
}

function createBadgeClass(variant = 'default', className = '') {
    return cn(
        componentClasses.badge.base,
        componentClasses.badge.variants[variant],
        className
    );
}

// Export for use in other files
window.componentUtils = {
    cn,
    createButtonClass,
    createCardClass,
    createInputClass,
    createBadgeClass,
    componentClasses
};
