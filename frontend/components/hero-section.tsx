export default function HeroSection() {
  return (
    <section
      className="py-36 px-6 w-full h-72 rounded-md md:h-96"
      style={{
        backgroundImage: "url('/assets/Images/heroImage.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100%",
        width: "100%",
      }}
    >
      {/* TODO: picture for background */}
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl  -translate-y-[78%] md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 via-gray-200 to-zinc-300">
          Welcome to <span>LegalInk</span>
        </h1>
        <p
          className={`text-gradient-to-r tracking-wide md:text-xl rounded-md from-gray-100 via-gray-200 to-zinc-300 font-semibold transform translate-x-[20%] -translate-y-10 whitespace-nowrap px-4`}
          style={{
            wordSpacing: "0.2rem",
            fontFamily: "Caveat",
            fontSize: "1.5rem",
          }}
        >
          Provides you the space to ink your sayings and thoughts...
        </p>
        {/* <form className="flex flex-col md:flex-row gap-4 justify-center items-center">
                    <input
                        type="text"
                        placeholder="Search articles or topics"
                        className="w-full md:w-2/3 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                    <button
                        type="submit"
                        className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-blue-100 transition-colors duration-300"
                    >
                        Search
                    </button>
                </form> */}
        {/* <Form
                    action={"/"}
                    className="flex flex-col md:flex-row gap-4 justify-center items-center"
                >
                    <input
                        name="query"
                        type="text"
                        placeholder="Search articles or topics"
                        className="w-full md:w-2/3 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                    <button
                        type="submit"
                        className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-blue-100 transition-colors duration-300"
                    >
                        Search
                    </button>
                </Form> */}
      </div>
    </section>
  );
}
