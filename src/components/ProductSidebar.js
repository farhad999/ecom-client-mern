import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchBrands} from "../store/slices/brandSlice";
import {fetchCategories} from "../store/slices/categorySlice";
import {Link} from "react-router-dom";
import {useBootstrapBreakpoints} from "react-bootstrap/ThemeProvider";
import {Button, Offcanvas} from "react-bootstrap";

const ProductSidebar = () => {

    const [openSidebar, setOpenSidebar] = React.useState(false);

    const {brands, loading} = useSelector(state => state.brand);

    const {categories, loading: catLoading} = useSelector(state => state.cat);

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(fetchBrands());
        dispatch(fetchCategories())
    }, []);

    if (loading || catLoading) {
        return <div>loading...</div>
    }

    const sidebarContent = () => {

        return (
            <div>
                <Link to={'/products'}>
                    All Products
                </Link>

                <div className={'mt-2 font-bold text-lg'}>Top Brands</div>

                <div>
                    {brands.map((brand, index) => (
                        <div>
                            <Link to={`/products?brand=${brand.slug}`}>
                                {brand.name}
                            </Link>
                        </div>
                    ))}
                </div>

                <div className={'mt-2 text-lg font-bold'}>Top Categories</div>

                <div>
                    {categories.map((cat, index) => (
                        <div key={index}>
                            <Link to={`/products?category=${cat.slug}`}>{cat.name}</Link>
                        </div>
                    ))}
                </div>
            </div>
        )
    }



    return (
        <div>
            <div className={'d-none d-md-block'}>{sidebarContent()}</div>
            <Button className={'d-md-none'} onClick={()=>setOpenSidebar(true)}>Open Sidebar</Button>
            <Offcanvas show={openSidebar} onHide={()=>setOpenSidebar(false)}>
                <Offcanvas.Body>
                    <div>
                        {sidebarContent()}
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </div>

    )
}
export default ProductSidebar;
