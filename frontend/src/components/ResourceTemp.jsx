import React from "react";

const CardTemplate = ({ data }) => {
  return (
    <div className=" flex justify-center py-4">
    <div className="card mt-6 rounded-lg border-2 border-black w-[90%] md:w-[70%]">
      <div className=" p-6">
        <div className=" flex justify-center">
        <img
          src={data.imageUrl}
          alt={data.title}
          className="card-img-top rounded-lg h-64"
        />
        </div>
        <div className="card-body">
          <p className="card-title font-semibold text-xl pt-2 flex justify-center">{data.title}</p>
          <p className="card-text flex justify-center">{data.description}</p>
          <div className=" flex justify-center pt-2">
          <a href={data.link} target="_blank" className="card-text flex justify-center border-2 border-gray-900 bg-gradient-to-tr from-cyan-400 via-cyan-200 to-cyan-100 hover:from-cyan-100 hover:via-cyan-200 hover:to-cyan-400 w-fit rounded-lg p-2 px-3 text-lg">Download</a>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default CardTemplate;
