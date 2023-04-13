import './DetailsProduct.scss'
import React, { useState, useEffect } from "react";
import SearchForm from '../../components/searchForm/SearchForm';
import { Avatar } from "@mui/material"
import Rating from '@mui/material/Rating';
import { Form } from "antd";

const product_img = [
    "https://down-vn.img.susercontent.com/file/d5cbed2edb52b876e08c68bb14c97ef7_tn",
    "https://down-vn.img.susercontent.com/file/37188e9a7cc96f9f62652ac6a91f9115_tn",
    "https://down-vn.img.susercontent.com/file/dda3e10b0534b03de174cd42f82bc823_tn",
    "https://down-vn.img.susercontent.com/file/155daac641b94f078fc936b618f1212b_tn",
    
];

const number_of_product = 20;

const reviews_of_book = [
    {
        id: 1,
        name: "Maureen Burrows",
        cover: "https://raw.githubusercontent.com/paul-duvall/website_images/master/reviewer2.jpg",
        rating: 4.5,
        review: "Under the gifted guidance of Ron Burgandy, one of James Cameron's talented team, imaginative modern cooking from a kitchen brigade at the top of its game"
    },
    {
        id: 2,
        name: "Magnus Mahoney",
        cover: "https://raw.githubusercontent.com/paul-duvall/website_images/master/reviewer1.jpg",
        rating: 5,
        review: "On my midweek visit, every seat was taken by 6.15pm, the atmosphere was electric, the air filled with charcoal smoke, music and laughter"
    },
    {
        id: 3,
        name: "Rhonda Barajas",
        cover: "https://raw.githubusercontent.com/paul-duvall/website_images/master/reviewer3.jpg",
        rating: 5,
        review: "The friendly and welcoming staff act like they genuinely care, first and foremost, about you having a really good time. I'll drink to that"
    },
];


function DetailsProduct() {
    window.scrollTo(0, 0);
 
    const [value, setValue] = useState(3);

    useEffect(() => {
        document.querySelector(".detail_product_wrapper input").setAttribute("value", 1);

        const imgSelectItems = document.querySelectorAll(".detail_product_wrapper .img_selector .img_option");
        let imgId = 0;
        
        imgSelectItems.forEach((imgSelect) => {
            imgSelect.addEventListener('click', (event) => {
                event.preventDefault();
                imgId = imgSelect.dataset.id;
                imgSelectItems.forEach((x) => {x.setAttribute("aria-pressed", false)});
                imgSelect.setAttribute("aria-pressed", true);
                translateImg();
            });

        });

        function translateImg(){
            const slideWidth = document.querySelector(".detail_product_wrapper .img_slide_wrapper").clientWidth;
            document.querySelector('.detail_product_wrapper .img_slide').style.transform = `translateX(${- imgId * slideWidth}px)`;
        } 


        const tabSelectItems = document.querySelectorAll(".detail_product_wrapper .tab_list .tab_select");
        
        for (let i = 0; i < tabSelectItems.length; i++){
            tabSelectItems[i].addEventListener('click', (event) => {
                tabSelectItems[(i + 1) % 2].setAttribute("aria-selected", false);
                tabSelectItems[i].setAttribute("aria-selected", true);
                if (i == 0) {
                    document.querySelector(".detail_product_wrapper .tab_panel_content .description_tab_panel").style.display = "flex";
                    document.querySelector(".detail_product_wrapper .tab_panel_content .reviews_tab_panel").style.display = "none";
                } else {
                    document.querySelector(".detail_product_wrapper .tab_panel_content .description_tab_panel").style.display = "none";
                    document.querySelector(".detail_product_wrapper .tab_panel_content .reviews_tab_panel").style.display = "flex";
                }
                
            });
        }

        

    }, []);

    

    return (
        <>
            <div className="detail_page_container">
                <SearchForm/>
                <div className="detail_product_wrapper">
                    <div className="detail_product_container">
                        <div className="product_summary">
                            <div className="product_img_slider">
                                <div className="img_slide_wrapper">
                                    <div className="img_slide">
                                        {product_img.map((img) => (
                                            <img src={img} key={img.uniqueId} alt="" />
                                        ))}
                                    </div>
                                </div>

                                <div className="img_selector">
                                    {product_img.map((img, index) => (
                                        <div className='img_option' aria-pressed={(index==0?"true":"false")} data-id={index} key={img.uniqueId}>
                                            <img src={img} alt="" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="summarize">
                                <div className="product_title">
                                    Lyrics of the Lalala Musical
                                </div>
                                <div className="product_rating">
                                    <Rating name="read-only" value={4} size='large' readOnly />
                                    <span className='number_of_review'>(2 customer review)</span>
                                </div>
                                <div className="product_intro">
                                What can you do to save money with online shopping? You may be wondering if finding coupons and sales is time consuming. If you aren’t into that, there are other options. You simply need to heed the tips in this piece and act on them.
                                </div>
                                <div className="product_buy">
                                    <div className="product_price">$2.00</div>
                                    <div className="number_of_product">{number_of_product} in stock</div>
                                    <div className="quantity_and_button">
                                        <div className="quantity">
                                            <input type="number" name="" min={1} max={number_of_product}/>
                                        </div>
                                        <div className="add_button">ADD TO CART</div>
                                    </div>
                                </div>


                                <div className="product_categories">
                                    <span>Categories:</span>
                                    Culture, Life Style
                                </div>
                                <div className="products_tag">
                                    <span>Tags:</span>
                                    Dream, Music, Sound
                                </div>
                            </div>
                        </div>

                        <div className="product_detail">
                            <div className="book_detail">
                                <div className="title">Book Details</div>
                                <table className="book_infor">
                                    <tbody>
                                        <tr>
                                            <th>Page</th>
                                            <td>133 Page</td>
                                        </tr>

                                        <tr>
                                            <th>Cover Design</th>
                                            <td>Rebbeca L.</td>
                                        </tr>

                                        <tr>
                                            <th>Publisher</th>
                                            <td>Spartan </td>
                                        </tr>

                                        <tr>
                                            <th>Language</th>
                                            <td>English</td>
                                        </tr>

                                        <tr>
                                            <th>ISBN</th>
                                            <td>7787555</td>
                                        </tr>

                                        <tr>
                                            <th>Released</th>
                                            <td>July 2013</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="author">
                                <div className="title">About the Author</div>
                                <div className="author_infor">
                                    <div className="author_name">
                                        Saifudin A.
                                    </div>
                                    <div className="author_description">
                                        How to Build a Successful Blog Business is a straight forward guide to building a publishing business online that covers everything from choosing a niche to hiring staff, registering a business to selling it.
                                        <br></br> <br></br>
                                        Finding traffic to monetizing it whether you are interested in creating an additional income stream or building a fully-fledged business, this is an essential read for web entrepreneurs and online publishers.
                                    </div>
                                </div>
                                <div className="author_img">
                                    <Avatar className='avatar_img'/>
                                </div>

                            </div>

                        </div>

                        <div className="description_and_review">
                            <div className="tab_list">
                                <div className="tab_select" aria-selected="true">Description</div>
                                <div className="tab_select" aria-selected="false">Reviews</div>
                            </div>
                            <div className="tab_panel_content">
                                <div className="description_tab_panel">
                                If you want to buy books online, you’ll get a better deal if you get them used. Depending on the condition you get them in, you may just end up paying a few cents plus shipping. Make sure you read through the description of the book to see if there are any damages you should be aware of.
                                <br></br><br></br> Be sure to read everything about the item that you want to buy. A picture of a product can be deceiving. They can make products look much smaller or bigger that they really are. Reading the description will allow you to be confident in the item you are purchasing.
                                <br></br><br></br>Look into online shopping clubs. Sites like ebates.com have some tremendous offers. You not only find out about sales going on at different sites, but they pay you a percentage of your purchase when you buy from those sites. It is a great way to get a bonus check every four months and get the things you need.

                                <br></br><br></br>Be aware of shipping order laws for online merchants. The company is supposed to send your order within the time frame listed in its ad. By law, they have 30 days to send you your order or give you an option to cancel your order. If you do not receive your order within this time frame, call the company to let them know.
                                </div>

                                <div className="reviews_tab_panel">
                                    <div className="reviews_quantity">2 reviews for Lyrics of the Lalala Musical</div>
                                    {reviews_of_book.map((review, index) => (
                                        <div className="item_review" key={index}>
                                            <Avatar className='review_avatar' variant="square" src={ review["cover"]} />
                                            <div className="review_detail">
                                                <div className="review_name">{ review["name"]}</div>
                                                <div className="review_content">{ review["review"]}</div>
                                                <div className="review_rating">
                                                    <Rating name="read-only" value={review["rating"]} size='large' readOnly />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="review_add_form">
                                        <div className="form_title">
                                            <span>Add a review</span>
                                            Your email address will not be published. Required fields are marked *
                                        </div>
                                        <Form className='form_content'>
                                            <div className="form_input_row">
                                                <div className='label'>Your rating *</div>
                                                <Rating
                                                    className='rating'
                                                    name="simple-controlled" 
                                                    value={value}
                                                    onChange={(event, newValue) => {
                                                        setValue(newValue);
                                                    }}
                                                    size='large'
                                                />
                                            </div>
                                            <div className="form_input_row">
                                                <div className='label'>Your review *</div>
                                                <textarea name="" id="" cols="30" rows="5"></textarea>
                                            </div>
                                            <div className="form_input_row">
                                                <div className='label'>Name *</div>
                                                <input type="text" name="review_name" id="" />
                                            </div>
                                            <div className="form_input_row">
                                                <div className='label'>Email *</div>
                                                <input type="text" name="review_email" id="" />
                                            </div>
                                            <div className="form_input_row">
                                                <div className=""></div>
                                                <button className='submit_review'>Submit</button>
                                            </div>
                                            
                                        </Form>

                                    </div>
                                    
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DetailsProduct;