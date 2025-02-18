const Blogs = () => {
  return (
    <>
      <div id="blog" className="bg-gray-100 px-4 xl:px-0 py-12">
        <div className="mx-auto container">
          <div className="text-center">
            <h1 className="text-center font-bold text-3xl lg:text-5xl tracking-wider text-gray-900">
              Latest Blogs
            </h1>
            <p className="text-center mx-auto text-gray-700 text-base   lg:leading-8 tracking-wide mt-6 lg:w-[40%]">
              Explore our latest blog posts and stay up to date with the latest
              news and trends in the AI space.
            </p>
          </div>
          <div className="mt-12 ">
            <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8">
              <div>
                <img
                  className="w-full"
                  src="https://ph-files.imgix.net/2b5ed17a-176b-4672-b6d2-21e444de7859.png?auto=compress&codec=mozjpeg&cs=strip&auto=format&fm=pjpg&w=1100&h=589&fit=max&frame=1&dpr=1"
                  alt="computer"
                />

                <div className="bg-white px-10 py-6 rounded-bl-3xl rounded-br-3xl">
                  <h1 className="text-4xl text-gray-900 font-semibold tracking-wider">
                    21st.dev
                  </h1>
                  <p className="text-gray-700 text-base lg:text-lg  lg:leading-8 tracking-wide mt-6 w-11/12">
                    Make your AI websites look professional & beautiful.
                    Copy-paste UI into v0, Cursor, Bolt, Lovable, Replit from
                    the largest marketplace of UI elements. Get inspired by 50+
                    pro design engineers. Publish your design engineering work
                  </p>

                  <div className="h-5 w-2" />
                </div>
              </div>
              <div>
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
                  <div>
                    <img
                      className="w-full"
                      src="https://ph-files.imgix.net/e518bfeb-9e1f-4a2e-aace-4cfd8bc12566.png?auto=compress&codec=mozjpeg&cs=strip&auto=format&fm=pjpg&w=1069&h=640&fit=max&frame=1&dpr=1"
                      alt="games"
                    />

                    <div className="bg-white px-3  lg:px-6 py-4 rounded-bl-3xl rounded-br-3xl">
                      <h1 className="text-lg text-gray-900 font-semibold tracking-wider">
                        Send API by beehiiv
                      </h1>
                      <p className="text-gray-700 text-sm  lg:text-base  lg:leading-8 pr-4 tracking-wide mt-2">
                        Our new Send API allows you to leverage everything
                        beehiiv offers — analytics, referrals, monetization,
                        design, and more...
                      </p>
                    </div>
                  </div>
                  <div>
                    <img
                      className="w-full"
                      src="https://ph-files.imgix.net/264643b5-03bb-4317-9d21-92f190ad2d07.jpeg?auto=compress&codec=mozjpeg&cs=strip&auto=format&fm=pjpg&w=1100&h=619&fit=max&frame=1&dpr=1"
                      alt="notes"
                    />

                    <div className="bg-white px-3  lg:px-6 py-4 rounded-bl-3xl rounded-br-3xl">
                      <h1 className="text-lg text-gray-900 font-semibold tracking-wider">
                        Quickfill - A Figma Plugin
                      </h1>
                      <p className="text-gray-700 text-sm  lg:text-base  lg:leading-8 pr-4 tracking-wide mt-2">
                        QuickFill is a Figma plugin that streamlines your
                        workflow with ready-to-use text and visual assets.
                        Generate realistic and social icons...
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-10 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
                  <div>
                    <img
                      className="w-full"
                      src="https://ph-files.imgix.net/eb9fd74f-e2f9-49c9-8c27-49de75a854b5.png?auto=compress&codec=mozjpeg&cs=strip&auto=format&fm=pjpg&w=1100&h=609&fit=max&frame=1&dpr=1"
                      alt="laptop"
                    />

                    <div className="bg-white px-3  lg:px-6 py-4 rounded-bl-3xl rounded-br-3xl">
                      <h1 className="text-lg text-gray-900 font-semibold tracking-wider">
                        Sagehood
                      </h1>
                      <p className="text-gray-700 text-sm  lg:text-base  lg:leading-8 pr-4 tracking-wide mt-2">
                        Navigating the stock market is tough. Endless news,
                        fragmented tools & complex decisions leave investors
                        lost.
                      </p>
                    </div>
                  </div>
                  <div>
                    <img
                      className="w-full"
                      src="https://ph-files.imgix.net/c303b6d2-2f50-4aa7-85fc-f32838aeaafe.jpeg?auto=compress&codec=mozjpeg&cs=strip&auto=format&fm=pjpg&w=1069&h=640&fit=max&frame=1&dpr=1"
                      alt="worker"
                    />

                    <div className="bg-white px-3  lg:px-6 py-4 rounded-bl-3xl rounded-br-3xl">
                      <h1 className="text-lg text-gray-900 font-semibold tracking-wider">
                        Coval
                      </h1>
                      <p className="text-gray-700 text-sm  lg:text-base  lg:leading-8 pr-4 tracking-wide mt-2">
                        Coval helps developers build reliable voice and chat
                        agents faster with seamless simulation and evals.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blogs;
