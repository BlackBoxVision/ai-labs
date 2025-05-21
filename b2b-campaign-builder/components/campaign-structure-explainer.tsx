import { Card, CardContent } from "@/components/ui/card"
import { Layers, Target, MessageSquare, Hash } from "lucide-react"

export function CampaignStructureExplainer() {
  return (
    <Card className="border shadow-sm">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Understanding Your Campaign Structure</h3>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
              <Layers className="h-4 w-4" />
            </div>
            <div>
              <h4 className="font-medium mb-1">Campaign</h4>
              <p className="text-sm text-gray-600">
                The top level of your Google Ads account. It contains settings like budget, location targeting, and ad
                schedule.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
              <Target className="h-4 w-4" />
            </div>
            <div>
              <h4 className="font-medium mb-1">Ad Groups</h4>
              <p className="text-sm text-gray-600">
                Collections of related keywords and ads that target a specific theme or product. We've created multiple
                ad groups to better organize your keywords.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
              <Hash className="h-4 w-4" />
            </div>
            <div>
              <h4 className="font-medium mb-1">Keywords</h4>
              <p className="text-sm text-gray-600">
                The search terms that will trigger your ads. We've selected keywords with high relevance and search
                volume.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
              <MessageSquare className="h-4 w-4" />
            </div>
            <div>
              <h4 className="font-medium mb-1">Ad Copy</h4>
              <p className="text-sm text-gray-600">
                The text that appears in your ads. Each ad has headlines (the most prominent text) and descriptions
                (additional information).
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
