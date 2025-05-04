import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./ImageCarousel.css";

const imageData = [
    { src: "https://res.cloudinary.com/dtecs6q1u/image/upload/v1746282578/kids_qhohro.jpg", title: "兒童主日學" },
    { src: "https://res.cloudinary.com/dtecs6q1u/image/upload/v1746282579/students_opqmfj.jpg", title: "學生課輔" },
    { src: "https://res.cloudinary.com/dtecs6q1u/image/upload/v1746282578/elders_lu6stx.jpg", title: "長者關懷" },
    { src: "https://res.cloudinary.com/dtecs6q1u/image/upload/v1746282578/christmas_gwr7cj.jpg", title: "聖誕慶典" },
];

const ImageCarousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
        speed: 1500,
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <div className="carousel-wrapper">
            <Slider {...settings}>
                {imageData.map((item, index) => (
                    <div className="carousel-item" key={index}>
                        <img src={item.src} alt={item.title} />
                        <p className="carousel-title">{item.title}</p>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default ImageCarousel;
