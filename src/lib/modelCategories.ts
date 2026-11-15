import type { ThreeDModel } from "@/types/threeDModels";
import type { ModelCategory } from "@/types/siteContent";

export function modelCategoryFor(model: ThreeDModel, categories: Record<string, ModelCategory>): ModelCategory {
  return categories[model.id] ?? (model.is_watch || model.id === "local-watch-fallback" ? "horlogerie" : "models");
}
