import { Card, CardContent } from "@/components/ui/card"

interface GoogleAdPreviewProps {
  headline1: string
  headline2: string
  headline3: string
  description1: string
  description2: string
  finalUrl: string
  displayUrl: string
}

export function GoogleAdPreview({
  headline1,
  headline2,
  headline3,
  description1,
  description2,
  finalUrl = "https://example.com",
  displayUrl = "example.com",
}: GoogleAdPreviewProps) {
  return (
    <Card className="border shadow-sm overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center gap-1 mb-1">
          <div className="text-xs px-1 bg-blue-100 text-blue-800 rounded">Ad</div>
          <span className="text-xs text-gray-500">·</span>
          <span className="text-xs text-green-700">{displayUrl}</span>
        </div>

        <a href="#" className="block">
          <h3 className="text-xl text-blue-800 font-medium leading-tight">
            {headline1} | {headline2}
          </h3>
          <h4 className="text-blue-800 mb-1">{headline3}</h4>

          <p className="text-sm text-gray-600 mb-1">{description1}</p>
          <p className="text-sm text-gray-600">{description2}</p>
        </a>

        <div className="mt-2 flex flex-wrap gap-2">
          <div className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">Site links</div>
          <div className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">Call extension</div>
          <div className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">Location</div>
        </div>
      </CardContent>
    </Card>
  )
}
