import { BuilderComponent, ComponentType } from "@/types/builder";

interface AISection {
  id: string;
  type: string;
  title?: string;
  description?: string;
  content?: string;
  items?: Array<{
    title: string;
    description: string;
    icon?: string;
  }>;
}

interface AILayout {
  title: string;
  subtitle: string;
  sections: AISection[];
}

/**
 * Converts AI-generated layout to BuilderComponent format
 */
export function convertAILayoutToBuilderComponents(aiLayout: AILayout): BuilderComponent[] {
  const components: BuilderComponent[] = [];

  // Add a hero section at the top with the page title and subtitle
  components.push({
    id: `hero-${Date.now()}`,
    type: "hero",
    props: {
      title: aiLayout.title,
      subtitle: aiLayout.subtitle,
    },
    height: 600,
  });

  // Convert each AI section to a builder component
  aiLayout.sections.forEach((section, index) => {
    const componentType = mapAISectionType(section.type);

    if (componentType === "feature-grid" && section.items && section.items.length > 0) {
      // Create a feature grid section with feature cards
      components.push({
        id: `section-${index}-${Date.now()}`,
        type: "section",
        props: {
          title: section.title || "Features",
          description: section.description,
        },
        children: [
          {
            id: `row-${index}-${Date.now()}`,
            type: "row",
            props: {},
            children: [
              {
                id: `col-${index}-${Date.now()}`,
                type: "column",
                width: 12,
                children: [
                  {
                    id: `feature-grid-${index}-${Date.now()}`,
                    type: "feature-grid",
                    props: {
                      title: section.title || "Features",
                      features: section.items.map((item) => ({
                        title: item.title,
                        description: item.description,
                        icon: item.icon || "Star",
                      })),
                    },
                  },
                ],
              },
            ],
          },
        ],
      });
    } else if (componentType === "testimonials" && section.items && section.items.length > 0) {
      // Create a testimonials section
      components.push({
        id: `testimonials-${index}-${Date.now()}`,
        type: "testimonials",
        props: {
          title: section.title || "Testimonials",
          testimonials: section.items.map((item) => ({
            author: item.title,
            content: item.description,
            role: item.icon || "Customer",
          })),
        },
      });
    } else if (componentType === "pricing" && section.items && section.items.length > 0) {
      // Create a pricing section
      components.push({
        id: `pricing-${index}-${Date.now()}`,
        type: "pricing",
        props: {
          title: section.title || "Pricing",
          plans: section.items.map((item) => ({
            name: item.title,
            description: item.description,
            price: item.icon || "Custom",
          })),
        },
      });
    } else if (componentType === "cta") {
      // Create a CTA section
      components.push({
        id: `cta-${index}-${Date.now()}`,
        type: "cta",
        props: {
          title: section.title || "Ready to get started?",
          description: section.description || section.content,
          buttonText: "Get Started",
          buttonLink: "#contact",
        },
      });
    } else {
      // Generic section for other types
      components.push({
        id: `section-${index}-${Date.now()}`,
        type: "section",
        props: {
          title: section.title,
          description: section.description,
          content: section.content,
        },
        children: [
          {
            id: `row-${index}-${Date.now()}`,
            type: "row",
            props: {},
            children: [
              {
                id: `col-${index}-${Date.now()}`,
                type: "column",
                width: 12,
                children: [
                  {
                    id: `paragraph-${index}-${Date.now()}`,
                    type: "paragraph",
                    props: {
                      text: section.content || section.description || section.title,
                    },
                  },
                ],
              },
            ],
          },
        ],
      });
    }
  });

  return components;
}

/**
 * Maps AI section types to BuilderComponent types
 */
function mapAISectionType(aiType: string): ComponentType {
  const typeMap: Record<string, ComponentType> = {
    hero: "hero",
    features: "feature-grid",
    testimonials: "testimonials",
    pricing: "pricing",
    cta: "cta",
    stats: "feature-grid",
    team: "feature-grid",
    faq: "faq",
    contact: "contact-form",
    footer: "section",
  };

  return typeMap[aiType.toLowerCase()] || "section";
}
