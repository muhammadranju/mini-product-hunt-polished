import { useState } from "react";

const Faq = () => {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  const [show5, setShow5] = useState(false);

  return (
    <div className=" 2xl:container 2xl:mx-auto md:py-12 lg:px-20 md:px-6 py-9 px-4">
      <h2 className=" font-semibold lg:text-4xl text-3xl lg:leading-9 md:leading-7 leading-9 text-gray-800">
        Frequently Asked Questions
      </h2>
      <div className="mt-4 flex md:justify-between md:items-start md:flex-row flex-col justify-start items-start">
        <div className=" ">
          <p className=" font-normal text-base leading-6 text-gray-600 lg:w-8/12 md:w-9/12 ">
            Here are few of the most frequently asked questions by our valueable
            customers
          </p>
        </div>
      </div>
      <div className=" flex md:flex-row flex-col md:space-x-8 md:mt-16 mt-8">
        <div className=" w-full md:mt-0 sm:mt-14 mt-10">
          {/* <!-- Shipping Section --> */}
          <div>
            <div className=" flex justify-between items-center cursor-pointer">
              <h3
                onClick={() => setShow(!show)}
                className=" font-semibold text-xl leading-5 text-gray-800"
              >
                What is Mini Product Hunt?
              </h3>
              <button
                aria-label="too"
                className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
                onClick={() => setShow(!show)}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className={show ? "hidden" : "block"}
                    d="M10 4.1665V15.8332"
                    stroke="#1F2937"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4.16602 10H15.8327"
                    stroke="#1F2937"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <p
              className={
                "font-normal text-base leading-6 text-gray-600 mt-4 w-11/12 " +
                (show ? "block" : "hidden")
              }
            >
              Mini Product Hunt is a platform for discovering and sharing
              innovative tech products. Users can explore, post, like, comment,
              and report products while engaging with a community of tech
              enthusiasts, makers, and early adopters.
            </p>
          </div>

          <hr className=" my-7 bg-gray-200" />

          {/* <!-- Returns Section --> */}

          <div>
            <div className=" flex justify-between items-center cursor-pointer">
              <h3
                onClick={() => setShow2(!show2)}
                className=" font-semibold text-xl leading-5 text-gray-800"
              >
                How can I post a new product on Mini Product Hunt?
              </h3>
              <button
                aria-label="too"
                className=" cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
                onClick={() => setShow2(!show2)}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className={show2 ? "hidden" : "block"}
                    d="M10 4.1665V15.8332"
                    stroke="#1F2937"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4.16602 10H15.8327"
                    stroke="#1F2937"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <p
              className={
                "font-normal text-base leading-6 text-gray-600 mt-4 w-11/12 " +
                (show2 ? "block" : "hidden")
              }
            >
              To post a new product, sign up for an account, go to the "Submit
              Product" section, and fill in the necessary details, including the
              product name, description, images, and website link. Once
              submitted, it will be available for the community to view and
              interact with.
            </p>
          </div>

          <hr className=" my-7 bg-gray-200" />

          {/* <!-- Exchange Section --> */}

          <div>
            <div className=" flex justify-between items-center cursor-pointer">
              <h3
                onClick={() => setShow3(!show3)}
                className=" font-semibold text-xl leading-5 text-gray-800"
              >
                Can I report a product if I find something inappropriate?
              </h3>
              <button
                aria-label="too"
                className=" cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
                onClick={() => setShow3(!show3)}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className={show3 ? "hidden" : "block"}
                    d="M10 4.1665V15.8332"
                    stroke="#1F2937"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4.16602 10H15.8327"
                    stroke="#1F2937"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <p
              className={
                "font-normal text-base leading-6 text-gray-600 mt-4 w-11/12 " +
                (show3 ? "block" : "hidden")
              }
            >
              Yes, if you come across a product that violates our guidelines,
              contains misleading information, or is inappropriate, you can
              report it by clicking the "Report" button. Our moderation team
              will review it and take necessary action.
            </p>
          </div>

          <hr className=" my-7 bg-gray-200" />

          {/* Tracking Section */}

          <div>
            <div className=" flex justify-between items-center cursor-pointer">
              <h3
                onClick={() => setShow4(!show4)}
                className=" font-semibold text-xl leading-5 text-gray-800"
              >
                How do likes and comments work?
              </h3>
              <button
                aria-label="too"
                className=" cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
                onClick={() => setShow4(!show4)}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className={show4 ? "hidden" : "block"}
                    d="M10 4.1665V15.8332"
                    stroke="#1F2937"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4.16602 10H15.8327"
                    stroke="#1F2937"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <p
              className={
                "font-normal text-base leading-6 text-gray-600 mt-4 w-11/12 " +
                (show4 ? "blcok" : "hidden")
              }
            >
              Users can like a product to show appreciation and support for it.
              Additionally, users can leave comments to share feedback, ask
              questions, or discuss the product with other members of the
              community.
            </p>
          </div>
          <hr className=" my-7 bg-gray-200" />
          <div>
            <div className=" flex justify-between items-center cursor-pointer">
              <h3
                onClick={() => setShow5(!show5)}
                className=" font-semibold text-xl leading-5 text-gray-800"
              >
                Is there a way to feature my product for better visibility?
              </h3>
              <button
                aria-label="too"
                className=" cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
                onClick={() => setShow5(!show5)}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className={show5 ? "hidden" : "block"}
                    d="M10 4.1665V15.8332"
                    stroke="#1F2937"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4.16602 10H15.8327"
                    stroke="#1F2937"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <p
              className={
                "font-normal text-base leading-6 text-gray-600 mt-4 w-11/12 " +
                (show5 ? "blcok" : "hidden")
              }
            >
              Yes! Mini Product Hunt offers featured product placements that
              allow your product to gain more exposure. You can apply for a
              featured spot through your dashboard or contact our support team
              for more details.
            </p>
          </div>
          <hr className=" my-7 bg-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default Faq;
