import { useRouter } from "next/navigation";
import { StyledCardPromo } from "./extended";
import { paths } from "src/routes/paths";
import { useEffect, useRef, useState } from "react";

export default function PromoCard({ setIsDragging, isDragging, item }) {

    const router = useRouter();
    const elementRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            {
                root: null, // viewport
                rootMargin: '0px', // no margin
                threshold: 0.5, // 50% of target visible
            }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        // Clean up the observer
        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current);
            }
        };
    }, []);

    const handleClick = (route, data) => {
        if (!isDragging) {
            moveToProduct(route);
            if (typeof window !== "undefined" && window.dataLayer && isVisible) {
                window.dataLayer.push({
                    event: "promoClick",
                    promoDetail: {
                        promoId: data.id,
                        promoTitle: data.title,
                        promoRoute: data.url,
                        promoCategory: data.category_id,
                        promoStatus: data.status,
                    }
                });
            }
        }
    };

    function moveToProduct(route) {
        router.push(paths.promo.root(route));
    }

    useEffect(() => {
        if (typeof window !== "undefined" && window.dataLayer && isVisible) {
            window.dataLayer.push({
                event: "promoImpression",
                promoDetail: {
                    promoId: item.id,
                    promoTitle: item.title,
                    promoRoute: item.route,
                    promoCategory: item.category_id,
                    promoStatus: item.status,
                }
            });
        }
    }, [isVisible, item]);

    return (
        <span className="" ref={elementRef} onMouseDown={() => setIsDragging(false)} onClick={() => handleClick(item.route, item)}>
            <StyledCardPromo
                style={{
                    backgroundImage: `${item.background}`,
                    cursor: "pointer",
                    // backgroundColor: `${item.backgroundColor}`
                }}
            />
        </span>
    );
};
