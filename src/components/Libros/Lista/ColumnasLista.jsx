import { Column } from "primereact/column";
import { Rating } from "primereact/rating";

const columns = [
    { field: 'descripcion', header: 'Sinopsis' },
    { field: 'categoria', header: 'Categoría' },
    { field: 'rating', header: 'Rating' },
    { field: 'estado', header: 'Estado' }
];

export const RatingBodyTemplate = (rowData) => {
    return <Rating value={rowData.rating} readOnly cancel={false} />;
}

export const ColumnasLista = () => {

    return columns.map((column, _i) => {

        if (column.field === 'rating') {
            return <Column className="column" key={column.field} field={column.field} header={column.header} body={RatingBodyTemplate} sortable />;
        }

        if (column.field === 'descripcion') {
            return <Column style={{ wordWrap: "break-word", width: "5em" }} key={column.field} field={column.field} header={column.header} sortable />;
        }

        return <Column className="column" key={column.field} field={column.field} header={column.header} sortable />;

    });
}    
