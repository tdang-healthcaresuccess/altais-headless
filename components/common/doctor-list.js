// DocSearchList.jsx
// This component displays the list of doctors with a grid/list view and handles pagination.

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function DocSearchList({
  doctors,
  activeLayout,
  onSelectDoctor,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 6;

  const validDoctors = doctors || [];
  const totalPages = Math.ceil(validDoctors.length / doctorsPerPage);

  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = validDoctors.slice(
    indexOfFirstDoctor,
    indexOfLastDoctor
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={
        activeLayout === "grid"
          ? "flex flex-col md:flex-row flex-wrap gap-6"
          : "flex flex-col flex-wrap gap-6"
      }
    >
      {currentDoctors.length > 0 ? (
        currentDoctors.map((doc, index) => (
          <div
            key={index}
            className={
              activeLayout === "grid"
                ? "block border border-primary rounded-normal p-3 w-full md:w-full lg:w-[calc(50%-12px)]"
                : "block border border-primary rounded-normal p-3 w-full"
            }
          >
            <div className="flex pb-6 gap-6">
              <div
                className={
                  activeLayout === "grid"
                    ? "block border border-lightPrimary rounded-normal w-[30%] min-w-[118px] md:min-w-[133px] h-[124px] md:h-[140px]"
                    : "block border border-lightPrimary rounded-normal min-w-[200px] md:min-w-[200px] h-[200px] w-[200px]"
                }
              >
                <img
                  src={doc.node.featuredImage.node.sourceUrl}
                  alt={doc.node.title}
                  className={
                    activeLayout === "grid"
                      ? "rounded-normal w-full h-full object-cover"
                      : "rounded-normal !w-[200px] !h-[200px] object-cover"
                  }
                />
              </div>
              <div className="block w-full">
                <div
                  className={activeLayout === "grid" ? "block" : "flex gap-4"}
                >
                  <h3 className="font-semibold text-bluePrimary text-lg pb-2">
                    {doc.node.doctorData.doctorsName}
                  </h3>
                  <h3 className="font-normal text-bluePrimary text-lg pb-3">
                    {doc.node.doctorData.degree}
                  </h3>
                </div>
                <div
                  className={activeLayout === "grid" ? "block" : "flex gap-4"}
                >
                  <div className="block flex-1">
                    <p
                      className={
                        activeLayout === "grid"
                          ? "text-primary text-[10px] font-semibold pb-1 leading-[20px]"
                          : "text-primary text-base font-semibold pb-1"
                      }
                    >
                      Specialties
                    </p>
                    <p
                      className={
                        activeLayout === "grid"
                          ? "text-grey3d text-[10px] pb-2 leading-[20px]"
                          : "text-grey3d text-base pb-2"
                      }
                    >
                      {doc.node.doctorData.spec1}
                      {doc.node.doctorData.spec2 &&
                        `, ${doc.node.doctorData.spec2}`}
                      {doc.node.doctorData.spec3 &&
                        `, ${doc.node.doctorData.spec3}`}
                    </p>
                  </div>
                  <div className="block flex-1">
                    <p
                      className={
                        activeLayout === "grid"
                          ? "text-primary text-[10px] font-semibold pb-1 leading-[20px]"
                          : "text-primary text-base font-semibold pb-1"
                      }
                    >
                      Location
                    </p>
                    <p
                      className={
                        activeLayout === "grid"
                          ? "text-grey3d text-[10px] pb-2 leading-[20px]"
                          : "text-grey3d text-base pb-2"
                      }
                    >
                      {doc.node.doctorData.practiceName} <br />
                       {doc.node.doctorData.address}
                      {doc.node.doctorData.addressStreet} <br />
                      {doc.node.doctorData.addressCity},{" "}
                      {doc.node.doctorData.state} {doc.node.doctorData.zipcode}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full gap-3 border-t border-lightPrimary pt-3 items-center">
            <a
              href={`/physicians${doc.node.doctorData.profileurl}`}
              className="btn-md btn-outline-secondary flex-center !w-50 !px-1 font-semibold rounded-normal flex-1 text-center"
            >
              View Profile
            </a>
            <a
              href={`tel:${doc.node.doctorData.phone}`}
              className="btn-md btn-outline-ternery !w-50 !px-1 rounded-normal font-semibold flex-1 flex items-center justify-center text-center"
            >
              Click to Call
            </a>
          </div>
          </div>
        ))
      ) : (
        <div className="text-center w-full text-grey3d text-xl mt-10">
          No doctors found matching your criteria.
        </div>
      )}

      {/* Pagination */}
      {validDoctors.length > doctorsPerPage && (
        <div className="flex justify-end w-full mt-4">
          <ul className="flex gap-3">
            <li
              className={`pagination-li pag-action ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
              onClick={() =>
                handlePageChange(currentPage > 1 ? currentPage - 1 : 1)
              }
            >
              <ChevronLeft className="w-[20px] h-[20px] text-secondary" />{" "}
              Previous Page
            </li>
            {(() => {
              // Calculate start and end page for pagination window
              let startPage = Math.max(1, currentPage - 2);
              let endPage = Math.min(totalPages, startPage + 3);
              if (endPage - startPage < 3) {
                startPage = Math.max(1, endPage - 3);
              }
              return Array.from(
                { length: endPage - startPage + 1 },
                (_, i) => startPage + i
              ).map((page) => (
                <li
                  key={page}
                  className={`pagination-li ${currentPage === page ? "active" : ""} cursor-pointer`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </li>
              ));
            })()}
            <li
              className={`pagination-li pag-action ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
              onClick={() =>
                handlePageChange(
                  currentPage < totalPages ? currentPage + 1 : totalPages
                )
              }
            >
              Next Page{" "}
              <ChevronRight className="w-[20px] h-[20px] text-secondary" />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
