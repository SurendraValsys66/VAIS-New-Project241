export interface DisplayCondition {
  id: string;
  type: "device" | "custom";
  operator?: "and" | "or";
  value?: string;
}

export interface LandingPageBlockProperties extends Record<string, any> {
  // Common styling properties
  backgroundColor?: string;
  textColor?: string;
  padding?: string;
  margin?: string;
  borderRadius?: string;
  shadow?: string;
  opacity?: string;
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  lineHeight?: string;
  minHeight?: string;
  maxHeight?: string;
  // Spacing
  paddingTop?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  paddingRight?: string;
  marginTop?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
  // Borders
  borderColor?: string;
  borderWidth?: string;
  borderStyle?: string;
  // Typography
  letterSpacing?: string;
  textAlign?: string;
  textTransform?: string;
  // Dimensions
  width?: string;
  // Gap (for flex/grid)
  gap?: string;
  // Visibility
  showOn?: "all-devices" | "desktop-only" | "mobile-only" | "tablet-only";
  displayConditions?: DisplayCondition[];
  hideOnMobile?: boolean;
  hideOnTablet?: boolean;
  hideOnDesktop?: boolean;
}

export interface LandingPageBlock {
  id: string;
  type:
    | "header"
    | "hero"
    | "features"
    | "testimonials"
    | "about"
    | "contact-form"
    | "footer"
    | "section-spacer"
    | "pricing"
    | "faq"
    | "signup"
    | "pricing-footer"
    | "section"
    | "row"
    | "column";
  properties: LandingPageBlockProperties;
  children?: LandingPageBlock[];
}

export interface GridLayout {
  type: "grid";
  columns: number; // 12-column grid
  gap: number;
  responsiveBreakpoints?: {
    mobile: number;
    tablet: number;
  };
}

export interface ColumnLayout {
  gridStart: number; // 1-12
  gridEnd: number; // 1-12
  responsive: {
    mobile: number; // columns on mobile
    tablet: number; // columns on tablet
  };
}

export interface LandingPage {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  blocks: LandingPageBlock[];
}

// Drag and drop types
export interface DragItem {
  type: string;
  id: string;
  sourceId?: string;
  targetId?: string;
}

export type BlockType =
  | "component"
  | "section"
  | "row"
  | "column"
  | "spacer";
