import Head from 'next/head'

const Meta=({title})=>{
    return (
        <Head>
            <title>{title}</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <meta name="keywords" content="TodoList,TITIStudio" />
            <meta name="description" content="TodoList,TITIStudio" />
            <meta name="author" content="TITIStudio" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    )
}

export default Meta