import FishCards from "../FishCards/FishCards";
import ReactPaginate from 'react-paginate';
import { useEffect, useState } from 'react';





function ExploreFishes(props) {



    const itemsPerPage = 5;
    const [currentItems, setCurrentItems] = useState({});
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);
    const [pageOffset, setPageOffset] = useState(0);
  
    useEffect(() => {
      // Fetch items from another resources.
      const endOffset = itemOffset + itemsPerPage;
      console.log(`Loading items from ${itemOffset} to ${endOffset}`);
      setCurrentItems(Object.fromEntries(Object.entries(props.fishes).slice(itemOffset, endOffset)));
      //Object.fromEntries(Object.entries(data).slice(0, 3));
      setPageCount(Math.ceil(props.minted / itemsPerPage));
    }, [itemOffset, itemsPerPage, props.fishes]);
  
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % props.minted;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
      setPageOffset(event.selected);
    };

    return ( 
         <section id="section-collections" className="pt30 pb30">
                <div className="container relative-position">
                    <div className="col-lg-12 top-100">
                        <h2 className="style-2">The Citadef Council members count: {props.minted}</h2>
                    </div>
                    {(props.minted!==0) && (props.fishes!==[]) && (<ReactPaginate
                        previousLabel="Previous"
                        nextLabel="Next"
                        pageClassName="btn btn-primary btn-select-showmore"
                        pageLinkClassName="page-link bg-info text-dark"
                        previousClassName="btn btn-primary btn-select-showmore"
                        previousLinkClassName="page-link text-dark"
                        nextClassName="btn btn-primary btn-select-showmore"
                        nextLinkClassName="page-link text-dark"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName="pagination"
                        activeClassName="active"
                        forcePage={pageOffset}
                    />)}
                    <div className="bg-main-middle-left d-none d-lg-block"></div>
                    <div className="bg-main-middle-right d-none d-lg-block"></div>
                    <FishCards fishes={currentItems}  />
                </div>
            </section>
    )
}

export default ExploreFishes;