const collections = [
  {
    id: 1,
    image:
      "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/kawaii_collection_2_D7BLn2o.jpg?w=480&dpr=2",
  },

  {
    id: 2,
    image:
      "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/kawaii-collection-2_1_3OpCMjP.jpg?w=480&dpr=2",
  },

  {
    id: 3,
    image:
      "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/office_edit_web_61Crv5D.jpg?w=480&dpr=2",
  },

  {
    id: 4,
    image:
      "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/kawaii_collection_2_c30sbZ3.jpg?w=480&dpr=2",
  },
];

const FemaleCollections = () => {
  return (
    <section className="w-full bg-[#efefef] py-8 md:py-16">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6">
        {/* Heading */}
        <h1 className="text-2xl md:text-4xl font-bold text-center mb-6 md:mb-10">
          Curated For You
        </h1>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-5">
          {collections.map((item) => (
            <div
              key={item.id}
              className="relative overflow-hidden group cursor-pointer"
            >
              <img
                src={item.image}
                alt={`Collection ${item.id}`}
                className="w-full h-52 sm:h-72 md:h-80 lg:h-96 object-cover transition duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FemaleCollections;
