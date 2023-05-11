import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
export interface BookingProps extends ExtendedItemProps {
    bimoId?: string;
    bkIdentifier?: string;
    bkDescription?: string;
    bkDateStart?: string;
    bkDateEnd?: string;
    bkDataGroup?: string;
    bkTrainPathAdministrativeYear?: string;
}
export declare class Booking extends Item<Booking> {
    bimoId?: string;
    bkIdentifier?: string;
    bkDescription?: string;
    bkDateStart?: string;
    bkDateEnd?: string;
    bkDataGroup?: string;
    bkTrainPathAdministrativeYear?: string;
    constructor(props: BookingProps);
}
export default Booking;
