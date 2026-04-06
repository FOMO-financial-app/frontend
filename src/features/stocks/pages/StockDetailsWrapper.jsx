import { useSearchParams } from "react-router-dom";
import { StockDetailsPage } from "./StockDetailsPage";

export const StockDetailsWrapper = () => {
    const [searchParams] = useSearchParams();
    const symbol = searchParams.get("query");

    return <StockDetailsPage key={symbol} />;
}