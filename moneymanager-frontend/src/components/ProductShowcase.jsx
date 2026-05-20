import { assets } from "../assets/assets.js";

const ProductShowcase = () => {
  return (
    <section className="pb-24 px-4 md:px-8" style={{ background: "white" }}>
      <div className="container mx-auto max-w-5xl">
        <div className="rounded-3xl overflow-hidden"
          style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.14)", border: "2px solid #F7F2EB" }}>
          <img
            src={assets.landing}
            className="w-full h-auto object-cover"
            alt="TrackMyMoney Dashboard"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://placehold.co/1200x600/E4F5F2/2D8F7B?text=Dashboard+Preview";
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;