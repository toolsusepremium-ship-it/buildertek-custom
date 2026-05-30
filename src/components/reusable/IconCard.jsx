import {
    DollarSign,
    Gauge,
    Trophy
} from "lucide-react"
import Text from './Text'

const iconMap = {
    pricing: DollarSign,
    speed: Gauge,
    win: Trophy
}

const IconCard = ({ card }) => {
    const Icon = iconMap[card.icon]

    return (
        <div className="">

            {/* ICON OR IMAGE */}
            <div className="space-element">
                {card.useImage ? (
                    <img
                        src={card.image}
                        alt={card.title}
                        className="icon-large"
                    />
                ) : (
                    <div className="icon-container">
                        <Icon size={20} />
                    </div>
                )}
            </div>

            <Text
                variant="h5"
                color="default"
                className="lg:text-[30px] leading-8"
            >
                {card.title}
            </Text>

            <Text
                variant="body-lg-left"
                color="muted"
                className="mt-2"
            >
                {card.description}
            </Text>
        </div>
    )
}

export default IconCard