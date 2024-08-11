import { Card } from "../../../../components/ui/card"
import { Badge } from "../../../../components/ui/badge"
import { Button } from "../../../../components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "../../../../components/ui/avatar"

export default function RestrauntCard({name,logo,restrauntImage,category,pickupInfo,rating,distance,price}) {
  return (
    <Card className="max-w-md rounded-lg shadow-lg overflow-hidden border border-yellow-700 ">
      <div className="relative">
        <img src={restrauntImage} alt="RestImage" width={300} height={150} className="w-full h-36 object-cover" />
        <div className="absolute top-2 left-2">
          <Badge variant="secondary" className="text-xs">
            Sold out
          </Badge>
        </div>
        <div className="absolute top-2 right-2">
          <Button
            variant="ghost"
            size="icon"
            className="w-6 h-6 hover:bg-transparent text-gray-400 hover:text-gray-900"
          >
            <HeartIcon className="w-4 h-4" />
            <span className="sr-only">Favorite</span>
          </Button>
        </div>
      </div>
      <div className="p-4 bg-white">
        <div className="flex items-center mb-2">
          <Avatar className="border">
            <img src={logo} alt="RestLogo" />
            <AvatarFallback>TH</AvatarFallback>
          </Avatar>
          <div className="ml-2">
            <div className="font-semibold text-sm">{name}</div>
            <div className="text-xs text-gray-500">{category}</div>
          </div>
        </div>
        <div className="text-xs text-gray-500 mb-4">{pickupInfo}</div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <StarIcon className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">{rating}</span>
            <span className="text-xs text-gray-500 mx-2">|</span>
            <span className="text-xs text-gray-500">{distance}</span>
          </div>
          <div className="text-lg font-bold text-primary">{price}</div>
        </div>
      </div>
    </Card>
  )
}

function HeartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  )
}


function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}
