import Text from './Text'

const SimpleHeader = ({ title, description }) => {
    return (
        <div className="container-title text-center-section">
            <Text
                variant="h2"
                color="default"
                className="text-pre-line text-3xl lg:text-[54px] font-normal"
            >
                {title}
            </Text>

            <Text
                variant="body-lg"
                color="muted"
                className="mt-4 lg:text-[20px]"
            >
                {description}
            </Text>
        </div>
    )
}

export default SimpleHeader