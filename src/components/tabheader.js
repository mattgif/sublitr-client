import React from 'react';
import Filter from './filter';

export default function TabHeader(props) {
    let filters = props.filters;
    if (filters) {
        filters = filters.map(filter => {
            return(<Filter key={filter.name} name={filter.name} id={filter.name}/>);
        })
    }
    return(
        <div>
            <h2>{props.title}</h2>
            {props.secondary}
            {filters}
        </div>
    )
}