import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, Palette, Type, Box, Sparkles, ToggleLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface StylePanelProps {
  onClose?: () => void;
}

interface StyleState {
  // Layout
  width: string;
  blockAlignment: string;
  textAlignment: string;
  lineHeight: string;
  
  // Spacing
  paddingTop: string;
  paddingRight: string;
  paddingBottom: string;
  paddingLeft: string;
  marginTop: string;
  marginRight: string;
  marginBottom: string;
  marginLeft: string;
  
  // Background
  backgroundColor: string;
  backgroundImage: string;
  backgroundImageUrl: string;
  
  // Rounded Corners
  borderRadiusTopLeft: string;
  borderRadiusTopRight: string;
  borderRadiusBottomLeft: string;
  borderRadiusBottomRight: string;
  
  // Borders
  borderSize: string;
  borderColor: string;
  
  // Text
  textColor: string;
  fontSize: string;
  fontWeight: string;
  
  // Effects
  boxShadow: string;
  
  // Content Visibility
  contentVisibility: "all" | "desktop" | "mobile";
  displayConditions: string[];
}

export const StylePanel: React.FC<StylePanelProps> = ({ onClose }) => {
  const [styles, setStyles] = useState<StyleState>({
    width: "100",
    blockAlignment: "left",
    textAlignment: "left",
    lineHeight: "1.5",
    paddingTop: "16",
    paddingRight: "16",
    paddingBottom: "16",
    paddingLeft: "16",
    marginTop: "0",
    marginRight: "0",
    marginBottom: "0",
    marginLeft: "0",
    backgroundColor: "#ffffff",
    backgroundImage: "",
    backgroundImageUrl: "",
    borderRadiusTopLeft: "0",
    borderRadiusTopRight: "0",
    borderRadiusBottomLeft: "0",
    borderRadiusBottomRight: "0",
    borderSize: "0",
    borderColor: "#000000",
    textColor: "#000000",
    fontSize: "16",
    fontWeight: "400",
    boxShadow: "none",
    contentVisibility: "all",
    displayConditions: [],
  });

  const [expandedSections, setExpandedSections] = useState({
    layout: true,
    spacing: true,
    background: true,
    roundedCorners: true,
    borders: true,
    typography: true,
    effects: true,
    contentVisibility: true,
  });

  const [linkPaddingValues, setLinkPaddingValues] = useState(false);
  const [linkMarginValues, setLinkMarginValues] = useState(false);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const updateStyle = (key: keyof StyleState, value: any) => {
    setStyles((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const SectionHeader = ({ icon: Icon, label, section }: { icon: any; label: string; section: keyof typeof expandedSections }) => (
    <button
      onClick={() => toggleSection(section)}
      className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors border-b border-gray-100"
    >
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-valasys-orange" />
        <span className="font-semibold text-sm text-gray-900">{label}</span>
      </div>
      <ChevronDown
        className={cn(
          "w-4 h-4 text-gray-600 transition-transform",
          expandedSections[section] && "rotate-180"
        )}
      />
    </button>
  );

  const InputGroup = ({ label, value, onChange, unit = "" }: any) => (
    <div className="flex gap-2 items-center">
      <Input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 text-xs"
      />
      {unit && <span className="text-xs text-gray-500 w-6">{unit}</span>}
    </div>
  );

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <div className="border-b border-gray-200 p-4 flex items-center justify-between sticky top-0 bg-white">
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-valasys-orange" />
          <h2 className="font-bold text-gray-900">Styling</h2>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Layout Section */}
        <div>
          <SectionHeader icon={Box} label="Layout" section="layout" />
          {expandedSections.layout && (
            <div className="px-4 py-4 space-y-4 bg-gray-50">
              {/* Width */}
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-2">Width</label>
                <div className="flex gap-2 items-center">
                  <Input
                    type="number"
                    value={styles.width}
                    onChange={(e) => updateStyle("width", e.target.value)}
                    className="flex-1 text-xs"
                  />
                  <span className="text-xs text-gray-500">%</span>
                </div>
              </div>

              {/* Block Alignment */}
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-2">Block Alignment</label>
                <div className="flex gap-2">
                  {[
                    { value: "left", label: "↖" },
                    { value: "center", label: "⬆" },
                    { value: "right", label: "↗" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => updateStyle("blockAlignment", opt.value)}
                      className={cn(
                        "flex-1 py-2 rounded text-xs font-semibold transition-colors",
                        styles.blockAlignment === opt.value
                          ? "bg-valasys-orange text-white"
                          : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Text Alignment */}
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-2">Text Alignment</label>
                <div className="flex gap-2">
                  {[
                    { value: "left", label: "⬅" },
                    { value: "center", label: "↔" },
                    { value: "right", label: "➡" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => updateStyle("textAlignment", opt.value)}
                      className={cn(
                        "flex-1 py-2 rounded text-xs font-semibold transition-colors",
                        styles.textAlignment === opt.value
                          ? "bg-valasys-orange text-white"
                          : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Line Height */}
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-2">Line Height: {styles.lineHeight}</label>
                <input
                  type="range"
                  min="1"
                  max="3"
                  step="0.1"
                  value={styles.lineHeight}
                  onChange={(e) => updateStyle("lineHeight", e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
          )}
        </div>

        {/* Spacing Section */}
        <div>
          <SectionHeader icon={Box} label="Spacing" section="spacing" />
          {expandedSections.spacing && (
            <div className="px-4 py-4 space-y-4 bg-gray-50">
              {/* Padding */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-semibold text-gray-600">Padding</label>
                  <label className="flex items-center gap-2 text-xs text-gray-600">
                    <input
                      type="checkbox"
                      checked={linkPaddingValues}
                      onChange={(e) => setLinkPaddingValues(e.target.checked)}
                      className="cursor-pointer"
                    />
                    <span>Group sides</span>
                  </label>
                </div>
                {linkPaddingValues ? (
                  <InputGroup
                    value={styles.paddingTop}
                    onChange={(val: string) => {
                      updateStyle("paddingTop", val);
                      updateStyle("paddingRight", val);
                      updateStyle("paddingBottom", val);
                      updateStyle("paddingLeft", val);
                    }}
                    unit="px"
                  />
                ) : (
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                          <span className="text-xs">⬆</span> Top
                        </div>
                        <InputGroup
                          value={styles.paddingTop}
                          onChange={(val: string) => updateStyle("paddingTop", val)}
                          unit="px"
                        />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                          <span className="text-xs">➡</span> Right
                        </div>
                        <InputGroup
                          value={styles.paddingRight}
                          onChange={(val: string) => updateStyle("paddingRight", val)}
                          unit="px"
                        />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                          <span className="text-xs">⬇</span> Bottom
                        </div>
                        <InputGroup
                          value={styles.paddingBottom}
                          onChange={(val: string) => updateStyle("paddingBottom", val)}
                          unit="px"
                        />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                          <span className="text-xs">⬅</span> Left
                        </div>
                        <InputGroup
                          value={styles.paddingLeft}
                          onChange={(val: string) => updateStyle("paddingLeft", val)}
                          unit="px"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Margin */}
              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-semibold text-gray-600">Margin</label>
                  <label className="flex items-center gap-2 text-xs text-gray-600">
                    <input
                      type="checkbox"
                      checked={linkMarginValues}
                      onChange={(e) => setLinkMarginValues(e.target.checked)}
                      className="cursor-pointer"
                    />
                    <span>Group sides</span>
                  </label>
                </div>
                {linkMarginValues ? (
                  <InputGroup
                    value={styles.marginTop}
                    onChange={(val: string) => {
                      updateStyle("marginTop", val);
                      updateStyle("marginRight", val);
                      updateStyle("marginBottom", val);
                      updateStyle("marginLeft", val);
                    }}
                    unit="px"
                  />
                ) : (
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                          <span className="text-xs">⬆</span> Top
                        </div>
                        <InputGroup
                          value={styles.marginTop}
                          onChange={(val: string) => updateStyle("marginTop", val)}
                          unit="px"
                        />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                          <span className="text-xs">➡</span> Right
                        </div>
                        <InputGroup
                          value={styles.marginRight}
                          onChange={(val: string) => updateStyle("marginRight", val)}
                          unit="px"
                        />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                          <span className="text-xs">⬇</span> Bottom
                        </div>
                        <InputGroup
                          value={styles.marginBottom}
                          onChange={(val: string) => updateStyle("marginBottom", val)}
                          unit="px"
                        />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                          <span className="text-xs">⬅</span> Left
                        </div>
                        <InputGroup
                          value={styles.marginLeft}
                          onChange={(val: string) => updateStyle("marginLeft", val)}
                          unit="px"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Background Section */}
        <div>
          <SectionHeader icon={Palette} label="Background" section="background" />
          {expandedSections.background && (
            <div className="px-4 py-4 space-y-4 bg-gray-50">
              {/* Color */}
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-2">Color</label>
                <div className="flex gap-2 items-center">
                  <input
                    type="color"
                    value={styles.backgroundColor}
                    onChange={(e) => updateStyle("backgroundColor", e.target.value)}
                    className="w-10 h-10 rounded border border-gray-300 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={styles.backgroundColor}
                    onChange={(e) => updateStyle("backgroundColor", e.target.value)}
                    className="flex-1 text-xs"
                  />
                </div>
              </div>

              {/* Image */}
              <div className="border-t pt-4">
                <Button variant="outline" className="w-full text-xs">
                  Add Image
                </Button>
              </div>

              {/* Image URL */}
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-2">Image URL</label>
                <Input
                  type="text"
                  value={styles.backgroundImageUrl}
                  onChange={(e) => updateStyle("backgroundImageUrl", e.target.value)}
                  className="text-xs"
                  placeholder="https://..."
                />
              </div>
            </div>
          )}
        </div>

        {/* Rounded Corners Section */}
        <div>
          <SectionHeader icon={Sparkles} label="Rounded Corners" section="roundedCorners" />
          {expandedSections.roundedCorners && (
            <div className="px-4 py-4 space-y-4 bg-gray-50">
              <div className="space-y-2">
                <InputGroup
                  label="Radius"
                  value={styles.borderRadiusTopLeft}
                  onChange={(val: string) => {
                    updateStyle("borderRadiusTopLeft", val);
                    updateStyle("borderRadiusTopRight", val);
                    updateStyle("borderRadiusBottomLeft", val);
                    updateStyle("borderRadiusBottomRight", val);
                  }}
                  unit="px"
                />
              </div>
            </div>
          )}
        </div>

        {/* Borders Section */}
        <div>
          <SectionHeader icon={Box} label="Borders" section="borders" />
          {expandedSections.borders && (
            <div className="px-4 py-4 space-y-4 bg-gray-50">
              <label className="flex items-center gap-2 text-xs text-gray-600 mb-3">
                <input type="checkbox" />
                Apply to all slides
              </label>

              {/* Size */}
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-2">Size</label>
                <InputGroup
                  value={styles.borderSize}
                  onChange={(val: string) => updateStyle("borderSize", val)}
                  unit="px"
                />
              </div>

              {/* Color */}
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-2">Color</label>
                <div className="flex gap-2 items-center">
                  <input
                    type="color"
                    value={styles.borderColor}
                    onChange={(e) => updateStyle("borderColor", e.target.value)}
                    className="w-10 h-10 rounded border border-gray-300 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={styles.borderColor}
                    onChange={(e) => updateStyle("borderColor", e.target.value)}
                    className="flex-1 text-xs"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Typography Section */}
        <div>
          <SectionHeader icon={Type} label="Typography" section="typography" />
          {expandedSections.typography && (
            <div className="px-4 py-4 space-y-4 bg-gray-50">
              {/* Text Color */}
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-2">Text Color</label>
                <div className="flex gap-2 items-center">
                  <input
                    type="color"
                    value={styles.textColor}
                    onChange={(e) => updateStyle("textColor", e.target.value)}
                    className="w-10 h-10 rounded border border-gray-300 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={styles.textColor}
                    onChange={(e) => updateStyle("textColor", e.target.value)}
                    className="flex-1 text-xs"
                  />
                </div>
              </div>

              {/* Font Size */}
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-2">Font Size: {styles.fontSize}px</label>
                <input
                  type="range"
                  min="8"
                  max="72"
                  value={styles.fontSize}
                  onChange={(e) => updateStyle("fontSize", e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Font Weight */}
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-2">Font Weight</label>
                <select
                  value={styles.fontWeight}
                  onChange={(e) => updateStyle("fontWeight", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-valasys-orange focus:border-valasys-orange"
                >
                  <option value="300">Light (300)</option>
                  <option value="400">Regular (400)</option>
                  <option value="500">Medium (500)</option>
                  <option value="600">Semibold (600)</option>
                  <option value="700">Bold (700)</option>
                  <option value="800">Extrabold (800)</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Effects Section */}
        <div>
          <SectionHeader icon={Sparkles} label="Effects" section="effects" />
          {expandedSections.effects && (
            <div className="px-4 py-4 space-y-4 bg-gray-50">
              {/* Shadow */}
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-2">Shadow</label>
                <select
                  value={styles.boxShadow}
                  onChange={(e) => updateStyle("boxShadow", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-valasys-orange focus:border-valasys-orange"
                >
                  <option value="none">None</option>
                  <option value="0 1px 2px rgba(0,0,0,0.05)">Small</option>
                  <option value="0 4px 6px rgba(0,0,0,0.1)">Medium</option>
                  <option value="0 10px 15px rgba(0,0,0,0.1)">Large</option>
                  <option value="0 20px 25px rgba(0,0,0,0.15)">Extra Large</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Content Visibility Section */}
        <div>
          <SectionHeader icon={ToggleLeft} label="Content Visibility" section="contentVisibility" />
          {expandedSections.contentVisibility && (
            <div className="px-4 py-4 space-y-4 bg-gray-50">
              <p className="text-xs text-gray-600 mb-3">Display or hide content based on the type of device or other specific conditions</p>

              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-2">Show on:</label>
                <div className="space-y-2">
                  {[
                    { value: "all", label: "All devices" },
                    { value: "desktop", label: "Only on desktop" },
                    { value: "mobile", label: "Only on mobile" },
                  ].map((opt) => (
                    <label key={opt.value} className="flex items-center gap-2 text-xs">
                      <input
                        type="radio"
                        name="visibility"
                        value={opt.value}
                        checked={styles.contentVisibility === opt.value}
                        onChange={(e) => updateStyle("contentVisibility", e.target.value)}
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Display Conditions */}
              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-gray-600">Display conditions</label>
                  <Button variant="ghost" size="sm" className="text-xs h-6">
                    + Add condition
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 p-4 bg-gray-50 space-y-2">
        <Button className="w-full bg-valasys-orange hover:bg-valasys-orange/90 text-white rounded-lg">
          Apply Styles
        </Button>
        <Button variant="outline" className="w-full rounded-lg">
          Reset
        </Button>
      </div>
    </div>
  );
};
