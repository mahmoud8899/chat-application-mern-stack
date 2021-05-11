import {Helmet} from "react-helmet"


const Title = ({title, description}) =>{

  return (
    <Helmet>
    <title name="title">{title}</title>
    <meta name="description" content={description}/>

    </Helmet>
  )
}



Title.defaultProps = {

  title : 'Welcom To Shipping',
  description : 'Buy ....'
}


export default Title