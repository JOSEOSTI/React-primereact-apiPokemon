import React, { useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { PokemonApiServices } from '../../services/pokemon.services';
import { InputText } from 'primereact/inputtext';
import './DataTableDemo.css';

const TablePokemon = () => {
    const [pokemons, setPokemons] = useState(null);
    const [loading, setLoading] = useState(true);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [selectedPokemons, setSelectedPokemons] = useState(null);
    const [filters, setFilters] = useState({
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'representative': { value: null, matchMode: FilterMatchMode.IN },
        'date': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
        'balance': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        'status': { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        'activity': { value: null, matchMode: FilterMatchMode.BETWEEN }
    });
    useEffect(() => {
        // declare the async data fetching function
        const fetchData = async () => {
            const response = await PokemonApiServices.getApiPokemon();
            const data = response.data.results.map(async (pokemon) => {
                const datos = await PokemonApiServices.getApiPokemonData(pokemon.url);
                const result = datos.data
                return result
            })
            const result = await Promise.all(data)
            if (result) {
                setLoading(false)
            }
            setPokemons(result);

        }
        fetchData()

    }, [])

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    }
    const renderHeader = () => {
        return (
            <div className="flex justify-content-between align-items-center">
                <h5 className="m-0">Customers</h5>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </span>
            </div>
        )
    }
    const representativeBodyTemplate = (rowData) => {
        const representative = rowData.sprites.front_default;
        return (
            <React.Fragment>
                <img alt={representative.name} src={`${representative}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} width={32} style={{ verticalAlign: 'middle' }} />
                <span className="image-text">{representative.name}</span>
            </React.Fragment>
        );
    }
    const actionBodyTemplate = () => {
        return <Button type="button" icon="pi pi-cog"></Button>;
    }
    const header = renderHeader();
    return (
        <div className="datatable-doc-demo">
            <div className="card">
                <DataTable value={pokemons} paginator className="p-datatable-customers" header={header} rows={10}
                 paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" rowsPerPageOptions={[10,25,50]}
                 dataKey="id" rowHover selection={selectedPokemons} onSelectionChange={e => setSelectedPokemons(e.value)}
                 filters={filters} filterDisplay="menu" loading={loading} responsiveLayout="scroll"
                 globalFilterFields={['name', 'country.name', 'representative.name', 'balance', 'status']} emptyMessage="No customers found."
                 currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries">
                    <Column selectionMode="multiple" headerStyle={{ width: '3em' }}></Column>
                    <Column field="id" header="Code"></Column>
                    <Column field="name" header="Name" style={{ minWidth: '14rem' }}  sortable filter filterPlaceholder="Search by name"></Column>
                    <Column header="Image" body={representativeBodyTemplate}></Column>
                    <Column headerStyle={{ width: '4rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} />
                </DataTable>
            </div>
        </div>
    )
}

export default TablePokemon