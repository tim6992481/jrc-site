import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ImageCarousel.css";

const imageData = [
    { src: "/jrc-site/images/kids.jpg", title: "兒童主日學" },
    { src: "/jrc-site/images/students.jpg", title: "學生課輔" },
    { src: "/jrc-site/images/elders.jpg", title: "長者關懷" },
    { src: "/jrc-site/images/christmas.jpg", title: "聖誕慶典" },
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
