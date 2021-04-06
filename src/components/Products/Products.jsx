import React from 'react'
import {Grid} from '@material-ui/core'
import Product from "./Product/Product"

const productProps = [
    {id:1, name:'Shoes', description : 'Running Shoes', price:'80,000'},
    {id:2, name:'Macbook', description : 'Apple Macbook', price:'3,500,000'},
    {id:3, name:'Cellphone', description : 'Samsung Galaxy S21', price:'1,200,000'}
]

const Products = () => {
    return (
        <main>
            <Grid container justify="center" spacing={4}>
                {productProps.map((product) => {
                    <Grid item key = {productProps.id} xs={12} sm={6} md={4} lg = {3}>
                        <Product product = {product}/>
                    </Grid>
                })}
            </Grid>
        </main>
    )
}

export default Products