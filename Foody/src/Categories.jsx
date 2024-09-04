import burger from './images/burger.png';
import pizza from './images/pizza.png';
import shawarma from './images/shawarma.png';
import smoothie from './images/smoothie.png';
import sandwich from './images/sandwich.png';
import cake from './images/cake.png';

const Categories = () => {
    return(
        <section className="flex flex-col items-center mt-10 p-6 ">
            <h1 className="text-2xl font-bold md:text-4xl"><span className="text-myorange">More than</span> 2000 Dishes to order</h1>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>

            <div className="flex flex-col md:flex-row gap-2 overflow-x">
                <div className="text-center">
                    <img src={burger} alt="A burger" className='w-36 h-32' />
                    <p className='font-bold'>Burger</p>
                </div>
                
                <div className="text-center">
                    <img src={pizza} alt="A burger" className='w-36 h-32' />
                    <p className='font-bold'>Pizza</p>
                </div>

                <div className="text-center">
                    <img src={shawarma} alt="A burger" className='w-36 h-32' />
                    <p className='font-bold'>Shawarma</p>
                </div>

                <div className="text-center ">
                    <img src={smoothie} alt="A burger" className='w-36 h-32' />
                    <p className='font-bold'>Smoothie</p>
                </div>

                <div className="text-center">
                    <img src={sandwich} alt="A burger" className='w-36 h-32' />
                    <p className='font-bold'>Sandwich</p>
                </div>
                <div className="text-center">
                    <img src={cake} alt="A burger" className='w-36 h-32' />
                    <p className='font-bold'>Cake</p>
                </div>
            </div>
        </section>
    )
}

export default Categories;