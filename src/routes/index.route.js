import userRoute from "./user.route.js";
import categoryRoute from "./category.route.js";
import uploadRoute from "./upload.route.js";
import bannerRoute from "./banner.route.js";
import bookRoute from "./book.route.js";
import paymentRoute from "./payment.route.js";

const routes = (app) => {
    userRoute(app);
    categoryRoute(app);
    uploadRoute(app);
    bannerRoute(app);
    bookRoute(app);
    paymentRoute(app);
}

export default routes;