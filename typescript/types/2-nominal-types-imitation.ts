type CompanyID = string & { readonly brand: unique symbol };
type OrderID = string & { readonly brand: unique symbol };
type UserID = string & { readonly brand: unique symbol };
type ID = CompanyID | OrderID | UserID;

// create ids using companion-object pattern
function CompanyID(id: string) {
  return id as CompanyID;
}

function OrderID(id: string) {
  return id as OrderID;
}

function UserID(id: string) {
  return id as UserID;
}

function queryForUser(id: UserID) {
  console.log(id);
}

const companyID = CompanyID('asd-1235-sdds');
const orderID = OrderID('sdf-1635-cvfs');
const userID = UserID('vbn-1655-ghjk');

queryForUser(userID); // OK
// queryForUser(companyID); // TS error
// queryForUser(orderID); // TS error
