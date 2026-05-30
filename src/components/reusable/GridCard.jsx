import Text from './Text'

const GridCard = ({ feature }) => {
    return (
                
        <div className="card-base h-full flex flex-col justify-between card-padding max-w-[620px]">

          <div>
              <Text
                variant="h5"
                color="default"
                className="lg:text-[30px] mb-3"
            >
                {feature.title}
            </Text>

            <Text
                variant="body-lg"
                color="muted"
                className="space-small"
            >
                {feature.description}
            </Text>

          </div>
            {/* Image */}
            <div className="mt-6 bg-gray-100 rounded-lg overflow-hidden max-h-[300px] flex-center">
                <img
                    src={feature.image}
                    alt={feature.title}
                    className="img-cover"
                />
            </div>
        </div>
    )
}

export default GridCard