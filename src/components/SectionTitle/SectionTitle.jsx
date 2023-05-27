

const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className="mx-auto md:w-2/6 text-center my-8">
            <p className="text-yellow-500 mb-2"> --- {subHeading} --- </p>
            <h3 className="text-3xl uppercase border-y-4 py-4 font-semibold">{heading}</h3>
        </div>
    );
};

export default SectionTitle;