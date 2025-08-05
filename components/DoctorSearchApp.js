import { useState, useEffect } from 'react';

/**
 * This component is a self-contained search template for doctors using React.
 * It now uses a local set of dummy data to demonstrate search functionality
 * without needing an external GraphQL endpoint.
 *
 * It searches for multiple custom fields and displays the results, now with
 * alphabetical sorting and pagination.
 */
function DoctorSearchApp() {
  // Dummy data is included here to ensure the code compiles and runs correctly
  // without needing a separate file import.
  const dummyDoctors = [
  {
    "node": {
      "id": "QWFtaXIgRmFydXF1aS0wNDAzOTYyMDA2MQ==",
      "title": "Dr. Aamir Faruqui",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=AF"
        }
      },
      "doctorData": {
        "doctorsName": "Aamir Faruqui",
        "zipcode": "94598",
        "practiceName": "Aamir A Faruqui, MD, Inc",
        "speciality": "Pulmonary Disease",
        "degree": "M.D.",
        "spec1": "Pulmonary Disease",
        "spec2": "Critical Care Medicine",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259342121"
      }
    }
  },
  {
    "node": {
      "id": "TWVoclhJkIFl1cm9iLWNyb3dhZW0xNzQzMg==",
      "title": "Dr. Mehrnoosh Almassi",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=MA"
        }
      },
      "doctorData": {
        "doctorsName": "Mehrnoosh Almassi",
        "zipcode": "94520",
        "practiceName": "Mehrnoosh Almassi MD Inc",
        "speciality": "Obstetrics and Gynecology",
        "degree": "M.D.",
        "spec1": "Obstetrics and Gynecology",
        "spec2": null,
        "spec3": null,
        "addressCity": "Concord",
        "state": "CA",
        "phone": "9253568990"
      }
    }
  },
  {
    "node": {
      "id": "QmVsbGEgRG9zaGktMTAwMDk4",
      "title": "Dr. Bella Doshi",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=BD"
        }
      },
      "doctorData": {
        "doctorsName": "Bella Doshi",
        "zipcode": "94609",
        "practiceName": "BayChildren's Physicians",
        "speciality": "Pediatrics",
        "degree": "M.D.",
        "spec1": "Pediatrics",
        "spec2": null,
        "spec3": null,
        "addressCity": "Oakland",
        "state": "CA",
        "phone": "5104283590"
      }
    }
  },
  {
    "node": {
      "id": "UmljYXJkbyBkYSBSb3phLTEwMDQwMjEw",
      "title": "Dr. Ricardo Da Roza",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=RD"
        }
      },
      "doctorData": {
        "doctorsName": "Ricardo Da Roza",
        "zipcode": null,
        "practiceName": null,
        "speciality": "Medical Oncology",
        "degree": "M.D.",
        "spec1": null,
        "spec2": null,
        "spec3": null,
        "addressCity": null,
        "state": null,
        "phone": null
      }
    }
  },
  {
    "node": {
      "id": "THluZGEgRnJhc3NldHRvLTEwMDQ3MA==",
      "title": "Dr. Lynda Frassetto",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=LF"
        }
      },
      "doctorData": {
        "doctorsName": "Lynda Frassetto",
        "zipcode": "94520",
        "practiceName": "Bay Area Surgical Specialists, Inc",
        "speciality": "Nephrology",
        "degree": "M.D.",
        "spec1": "Nephrology",
        "spec2": "Internal Medicine",
        "spec3": null,
        "addressCity": "Concord",
        "state": "CA",
        "phone": "9256877272"
      }
    }
  },
  {
    "node": {
      "id": "THluZGEgRnJhc3NldHRvLTEwMDQ3MA==",
      "title": "Dr. Louay Toma",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=LT"
        }
      },
      "doctorData": {
        "doctorsName": "Louay Toma",
        "zipcode": "94598",
        "practiceName": "Golden State Orthopedics & Spine",
        "speciality": "Orthopaedic Surgery",
        "degree": "M.D.",
        "spec1": "Orthopaedic Surgery",
        "spec2": null,
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259398585"
      }
    }
  },
  {
    "node": {
      "id": "QXJ0aHVyIEFibGluLTEwMDk4Ng==",
      "title": "Dr. Arthur Ablin",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=AA"
        }
      },
      "doctorData": {
        "doctorsName": "Arthur Ablin",
        "zipcode": null,
        "practiceName": null,
        "speciality": "Pediatric Hematology-Oncology",
        "degree": "M.D.",
        "spec1": null,
        "spec2": null,
        "spec3": null,
        "addressCity": null,
        "state": null,
        "phone": null
      }
    }
  },
  {
    "node": {
      "id": "VmluZWV0IEJhdHJhLTEwMTA1Mw==",
      "title": "Dr. Vineet Batra",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=VB"
        }
      },
      "doctorData": {
        "doctorsName": "Vineet Batra",
        "zipcode": "94578",
        "practiceName": "V Nicholas Batra, MD, Inc",
        "speciality": "Ophthalmology",
        "degree": "M.D.",
        "spec1": "Ophthalmology",
        "spec2": null,
        "spec3": null,
        "addressCity": "San Leandro",
        "state": "CA",
        "phone": "5102761212"
      }
    }
  },
  {
    "node": {
      "id": "Um9uYWxkIENvaGVuLTEwMTIwNDAz",
      "title": "Dr. Ronald Cohen",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=RC"
        }
      },
      "doctorData": {
        "doctorsName": "Ronald Cohen",
        "zipcode": "94609",
        "practiceName": "Pediatric Imaging Medical Associates",
        "speciality": "Diagnostic Radiology",
        "degree": "M.D.",
        "spec1": "Diagnostic Radiology",
        "spec2": null,
        "spec3": null,
        "addressCity": "Oakland",
        "state": "CA",
        "phone": "5104283410"
      }
    }
  },
  {
    "node": {
      "id": "TGVvbmFyZCBJcmFnb25lLTEwMTI3Nw==",
      "title": "Dr. Leonard Dragone",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=LD"
        }
      },
      "doctorData": {
        "doctorsName": "Leonard Dragone",
        "zipcode": "94143",
        "practiceName": "UCSF Pediatrics Associates",
        "speciality": "Pediatric Rheumatology",
        "degree": "M.D.",
        "spec1": "Pediatric Rheumatology",
        "spec2": null,
        "spec3": null,
        "addressCity": "San Francisco",
        "state": "CA",
        "phone": "4154769184"
      }
    }
  },
  {
    "node": {
      "id": "RXN0aGVyIExpLUJsYW5kLTEwMTUw",
      "title": "Dr. Esther Li-Bland",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=EL"
        }
      },
      "doctorData": {
        "doctorsName": "Esther Li-Bland",
        "zipcode": "94609",
        "practiceName": "Asian Health Services",
        "speciality": "Family Medicine",
        "degree": "M.D.",
        "spec1": "Family Medicine",
        "spec2": null,
        "spec3": null,
        "addressCity": "Oakland",
        "state": "CA",
        "phone": "5109866800"
      }
    }
  },
  {
    "node": {
      "id": "UmFscGggQm91Y2hlci0xMDE2MjAwMA==",
      "title": "Dr. Ralph Boucher",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=RB"
        }
      },
      "doctorData": {
        "doctorsName": "Ralph Boucher",
        "zipcode": null,
        "practiceName": null,
        "speciality": "Advanced Heart Failure and Transplant Cardiology",
        "degree": "M.D.",
        "spec1": null,
        "spec2": null,
        "spec3": null,
        "addressCity": null,
        "state": null,
        "phone": null
      }
    }
  },
  {
    "node": {
      "id": "Q2hhcmxlcyBDaGFuLTEwMjAxNDM=",
      "title": "Dr. Charles Chan",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=CC"
        }
      },
      "doctorData": {
        "doctorsName": "Charles Chan",
        "zipcode": null,
        "practiceName": null,
        "speciality": "Orthopaedic Surgery",
        "degree": "M.D.",
        "spec1": "Orthopaedic Surgery",
        "spec2": null,
        "spec3": null,
        "addressCity": null,
        "state": null,
        "phone": null
      }
    }
  },
  {
    "node": {
      "id": "TWFyZ2FyZXQgRmVlbmV5LTEwMjAyNg==",
      "title": "Dr. Margaret Feeney",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=MF"
        }
      },
      "doctorData": {
        "doctorsName": "Margaret Feeney",
        "zipcode": "94143",
        "practiceName": "UCSF Medical Center",
        "speciality": "Pediatric Infectious Diseases",
        "degree": "M.D.",
        "spec1": "Pediatric Infectious Diseases",
        "spec2": null,
        "spec3": null,
        "addressCity": "San Francisco",
        "state": "CA",
        "phone": "4153532813"
      }
    }
  },
  {
    "node": {
      "id": "U2hlaWxhIEplbmtpbnMtMTAyMjU3",
      "title": "Dr. Sheila Jenkins",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=SJ"
        }
      },
      "doctorData": {
        "doctorsName": "Sheila Jenkins",
        "zipcode": "94598",
        "practiceName": "Lucile Packard Children’s Hospital",
        "speciality": "Urology, Pediatric",
        "degree": "M.D.",
        "spec1": "Urology, Pediatric",
        "spec2": null,
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": null
      }
    }
  },
  {
    "node": {
      "id": "TGF1cmEgUm9iZXJ0c29uLTEwMjI2",
      "title": "Dr. Laura Robertson",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=LR"
        }
      },
      "doctorData": {
        "doctorsName": "Laura Robertson",
        "zipcode": null,
        "practiceName": null,
        "speciality": "Pediatric Cardiology",
        "degree": "M.D.",
        "spec1": null,
        "spec2": null,
        "spec3": null,
        "addressCity": null,
        "state": null,
        "phone": null
      }
    }
  },
  {
    "node": {
      "id": "SmFpbWUgVGFubmVuYmF1bS0xMDIzMjA=",
      "title": "Dr. Jaime Tannenbaum",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=JT"
        }
      },
      "doctorData": {
        "doctorsName": "Jaime Tannenbaum",
        "zipcode": "94609",
        "practiceName": "East Bay Newborn Specialists, Inc",
        "speciality": "Neonatal-Perinatal Medicine",
        "degree": "M.D.",
        "spec1": "Neonatal-Perinatal Medicine",
        "spec2": null,
        "spec3": null,
        "addressCity": "Oakland",
        "state": "CA",
        "phone": "5104283276"
      }
    }
  },
  {
    "node": {
      "id": "Q2hyaXN0aW5lIFJpbGV5LTEwMjMyMDE5",
      "title": "Dr. Christine Riley",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=CR"
        }
      },
      "doctorData": {
        "doctorsName": "Christine Riley",
        "zipcode": null,
        "practiceName": null,
        "speciality": "Obstetrics and Gynecology",
        "degree": "M.D.",
        "spec1": null,
        "spec2": null,
        "spec3": null,
        "addressCity": null,
        "state": null,
        "phone": null
      }
    }
  },
  {
    "node": {
      "id": "V2VuZHkgV29uZy0xMDI2MTE0MA==",
      "title": "Dr. Wendy Wong",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=WW"
        }
      },
      "doctorData": {
        "doctorsName": "Wendy Wong",
        "zipcode": "94598",
        "practiceName": "Muir Orthopaedic Specialists",
        "speciality": "Orthopaedic Surgery",
        "degree": "M.D.",
        "spec1": "Orthopaedic Surgery",
        "spec2": null,
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259398585"
      }
    }
  },
  {
    "node": {
      "id": "U3VzYW4gU2FsYmFuaS0xMDM3NzY=",
      "title": "Dr. Susan Salbani",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=SS"
        }
      },
      "doctorData": {
        "doctorsName": "Susan Salbani",
        "zipcode": "94598",
        "practiceName": "All Star Healthcare Solutions",
        "speciality": "Ophthalmology",
        "degree": "M.D.",
        "spec1": "Ophthalmology",
        "spec2": null,
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": null
      }
    }
  },
  {
    "node": {
      "id": "TWFsaW5kYSBGbGVtc3Rlci0xMDQyNzE=",
      "title": "Dr. Malinda Flemster",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=MF"
        }
      },
      "doctorData": {
        "doctorsName": "Malinda Flemster",
        "zipcode": "94596",
        "practiceName": "Walnut Creek Internal Medicine Associates",
        "speciality": "Internal Medicine",
        "degree": "M.D.",
        "spec1": "Internal Medicine",
        "spec2": null,
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259393394"
      }
    }
  },
  {
    "node": {
      "id": "U3RlcGhhbiBDaGVuLTEwNDkz",
      "title": "Dr. Stephan Chen",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=SC"
        }
      },
      "doctorData": {
        "doctorsName": "Stephan Chen",
        "zipcode": "94609",
        "practiceName": "Alameda County Medical Center",
        "speciality": "Pediatric Cardiology",
        "degree": "M.D.",
        "spec1": "Pediatric Cardiology",
        "spec2": null,
        "spec3": null,
        "addressCity": "Oakland",
        "state": "CA",
        "phone": "5104283838"
      }
    }
  },
  {
    "node": {
      "id": "SmFtZXMgTWlsbGVyLTEwNTIy",
      "title": "Dr. James Miller",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=JM"
        }
      },
      "doctorData": {
        "doctorsName": "James Miller",
        "zipcode": "94105",
        "practiceName": "UCSF",
        "speciality": "Urology",
        "degree": "M.D.",
        "spec1": "Urology",
        "spec2": null,
        "spec3": null,
        "addressCity": "San Francisco",
        "state": "CA",
        "phone": "4153537238"
      }
    }
  },
  {
    "node": {
      "id": "Sm9obiBIYWxsaW5nLTEwNTQ5MA==",
      "title": "Dr. John Hall",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=JH"
        }
      },
      "doctorData": {
        "doctorsName": "John Hall",
        "zipcode": "94115",
        "practiceName": "UCSF",
        "speciality": "Pediatrics",
        "degree": "M.D.",
        "spec1": "Pediatrics",
        "spec2": null,
        "spec3": null,
        "addressCity": "San Francisco",
        "state": "CA",
        "phone": "4153539744"
      }
    }
  },
  {
    "node": {
      "id": "TWljaGFlbCBNYWRlcmEtMTA1NTQ=",
      "title": "Dr. Michael Madera",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=MM"
        }
      },
      "doctorData": {
        "doctorsName": "Michael Madera",
        "zipcode": "94609",
        "practiceName": "UCSF",
        "speciality": "Pediatric Surgery",
        "degree": "M.D.",
        "spec1": "Pediatric Surgery",
        "spec2": null,
        "spec3": null,
        "addressCity": "Oakland",
        "state": "CA",
        "phone": "5104283838"
      }
    }
  },
  {
    "node": {
      "id": "RW1pbHkgS2VuZGFsbC0xMDYxNTY=",
      "title": "Dr. Emily Kendall",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=EK"
        }
      },
      "doctorData": {
        "doctorsName": "Emily Kendall",
        "zipcode": "94598",
        "practiceName": "Children's Specialty Center",
        "speciality": "Pediatric Cardiology",
        "degree": "M.D.",
        "spec1": "Pediatric Cardiology",
        "spec2": null,
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417930"
      }
    }
  },
  {
    "node": {
      "id": "U3RldmVuIE1hdGhlcnMtMTA3MjA4",
      "title": "Dr. Steven Mathers",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=SM"
        }
      },
      "doctorData": {
        "doctorsName": "Steven Mathers",
        "zipcode": "94596",
        "practiceName": "BASS Medical Group",
        "speciality": "Nephrology",
        "degree": "M.D.",
        "spec1": "Nephrology",
        "spec2": "Internal Medicine",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259374020"
      }
    }
  },
  {
    "node": {
      "id": "TWF0dGhldyBHaWxwYXRyaWNrLTEwNzc1",
      "title": "Dr. Matthew Gilpatrick",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=MG"
        }
      },
      "doctorData": {
        "doctorsName": "Matthew Gilpatrick",
        "zipcode": "94553",
        "practiceName": "BASS Medical Group",
        "speciality": "Nephrology",
        "degree": "M.D.",
        "spec1": "Nephrology",
        "spec2": "Internal Medicine",
        "spec3": null,
        "addressCity": "Pacheco",
        "state": "CA",
        "phone": "9256801999"
      }
    }
  },
  {
    "node": {
      "id": "UmF2aSBFZ2FuLUd1cnUgMTA3NzUy",
      "title": "Dr. Ravi Egan-Guru",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=RE"
        }
      },
      "doctorData": {
        "doctorsName": "Ravi Egan-Guru",
        "zipcode": "94596",
        "practiceName": "BASS Medical Group",
        "speciality": "Internal Medicine",
        "degree": "M.D.",
        "spec1": "Internal Medicine",
        "spec2": null,
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259374020"
      }
    }
  },
  {
    "node": {
      "id": "U3RlZmFuIEtpbGxpbmdzLTEwODcxNQ==",
      "title": "Dr. Stefan Killings",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=SK"
        }
      },
      "doctorData": {
        "doctorsName": "Stefan Killings",
        "zipcode": null,
        "practiceName": null,
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": null,
        "state": null,
        "phone": null
      }
    }
  },
  {
    "node": {
      "id": "QnJpYW4gUGFya2VyLTEwODg2NA==",
      "title": "Dr. Brian Parker",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=BP"
        }
      },
      "doctorData": {
        "doctorsName": "Brian Parker",
        "zipcode": "94598",
        "practiceName": "BASS Medical Group",
        "speciality": "Hand Surgery",
        "degree": "M.D.",
        "spec1": "Hand Surgery",
        "spec2": "Orthopaedic Surgery",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259398585"
      }
    }
  },
  {
    "node": {
      "id": "U3RlcGhlbiBHdWRlbWFuLTEwODkwMg==",
      "title": "Dr. Stephen Gudeman",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=SG"
        }
      },
      "doctorData": {
        "doctorsName": "Stephen Gudeman",
        "zipcode": "94596",
        "practiceName": "BASS Medical Group",
        "speciality": "Nephrology",
        "degree": "M.D.",
        "spec1": "Nephrology",
        "spec2": "Internal Medicine",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259374020"
      }
    }
  },
  {
    "node": {
      "id": "U3RldmVuIEhlYWxzLTEwOTIzNA==",
      "title": "Dr. Steven Heals",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=SH"
        }
      },
      "doctorData": {
        "doctorsName": "Steven Heals",
        "zipcode": "94143",
        "practiceName": "University of California",
        "speciality": "Family Medicine",
        "degree": "M.D.",
        "spec1": "Family Medicine",
        "spec2": null,
        "spec3": null,
        "addressCity": "San Francisco",
        "state": "CA",
        "phone": null
      }
    }
  },
  {
    "node": {
      "id": "TWljaGFlbCBCb3lsZS0xMDkzMA==",
      "title": "Dr. Michael Boyle",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=MB"
        }
      },
      "doctorData": {
        "doctorsName": "Michael Boyle",
        "zipcode": "94520",
        "practiceName": "BASS Medical Group",
        "speciality": "Internal Medicine",
        "degree": "M.D.",
        "spec1": "Internal Medicine",
        "spec2": null,
        "spec3": null,
        "addressCity": "Concord",
        "state": "CA",
        "phone": "9253568990"
      }
    }
  },
  {
    "node": {
      "id": "RGF2aWQgV2VsbHMtMTEwOTI=",
      "title": "Dr. David Wells",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=DW"
        }
      },
      "doctorData": {
        "doctorsName": "David Wells",
        "zipcode": "94520",
        "practiceName": "Bay Area Surgical Specialists, Inc",
        "speciality": "General Surgery",
        "degree": "M.D.",
        "spec1": "General Surgery",
        "spec2": null,
        "spec3": null,
        "addressCity": "Concord",
        "state": "CA",
        "phone": "9256877272"
      }
    }
  },
  {
    "node": {
      "id": "RHVwaGFuIEthZGlhbS0xMTExMA==",
      "title": "Dr. Duphan Kadiam",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=DK"
        }
      },
      "doctorData": {
        "doctorsName": "Duphan Kadiam",
        "zipcode": "94553",
        "practiceName": "BASS Medical Group",
        "speciality": "Nephrology",
        "degree": "M.D.",
        "spec1": "Nephrology",
        "spec2": "Internal Medicine",
        "spec3": null,
        "addressCity": "Pacheco",
        "state": "CA",
        "phone": "9256801999"
      }
    }
  },
  {
    "node": {
      "id": "SmFtZXMgS2FydC0xMTU0OTk=",
      "title": "Dr. James Kart",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=JK"
        }
      },
      "doctorData": {
        "doctorsName": "James Kart",
        "zipcode": "94143",
        "practiceName": "UCSF",
        "speciality": "Pediatric Cardiology",
        "degree": "M.D.",
        "spec1": "Pediatric Cardiology",
        "spec2": null,
        "spec3": null,
        "addressCity": "San Francisco",
        "state": "CA",
        "phone": "4154763260"
      }
    }
  },
  {
    "node": {
      "id": "QnJpYW4gUGV0ZXJzb24tMTE1NjY=",
      "title": "Dr. Brian Peterson",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=BP"
        }
      },
      "doctorData": {
        "doctorsName": "Brian Peterson",
        "zipcode": "94598",
        "practiceName": "Orthopaedic Specialists",
        "speciality": "Orthopaedic Surgery",
        "degree": "M.D.",
        "spec1": "Orthopaedic Surgery",
        "spec2": "Sports Medicine",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259398585"
      }
    }
  },
  {
    "node": {
      "id": "U3VzYW4gU2FsYmFuaS0xMDM3NzY=",
      "title": "Dr. Suzanne Miller",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=SM"
        }
      },
      "doctorData": {
        "doctorsName": "Suzanne Miller",
        "zipcode": "94553",
        "practiceName": "BASS Medical Group",
        "speciality": "Internal Medicine",
        "degree": "M.D.",
        "spec1": "Internal Medicine",
        "spec2": "Nephrology",
        "spec3": null,
        "addressCity": "Pacheco",
        "state": "CA",
        "phone": "9256801999"
      }
    }
  },
  {
    "node": {
      "id": "TWFsaW5kYSBGbGVtc3Rlci0xMDQyNzE=",
      "title": "Dr. Charles Chan",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=CC"
        }
      },
      "doctorData": {
        "doctorsName": "Charles Chan",
        "zipcode": "94598",
        "practiceName": "Muir Orthopaedic Specialists",
        "speciality": "Orthopaedic Surgery",
        "degree": "M.D.",
        "spec1": "Orthopaedic Surgery",
        "spec2": null,
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259398585"
      }
    }
  },
  {
    "node": {
      "id": "U3RlcGhhbiBDaGVuLTEwNDkz",
      "title": "Dr. Michael Re",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=MR"
        }
      },
      "doctorData": {
        "doctorsName": "Michael Re",
        "zipcode": "94598",
        "practiceName": "Muir Orthopaedic Specialists",
        "speciality": "Orthopaedic Surgery",
        "degree": "M.D.",
        "spec1": "Orthopaedic Surgery",
        "spec2": null,
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259398585"
      }
    }
  },
  {
    "node": {
      "id": "SmFtZXMgTWlsbGVyLTEwNTIy",
      "title": "Dr. Benjamin Li",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=BL"
        }
      },
      "doctorData": {
        "doctorsName": "Benjamin Li",
        "zipcode": "94609",
        "practiceName": "Bay Children's Physicians",
        "speciality": "Pediatrics",
        "degree": "M.D.",
        "spec1": "Pediatrics",
        "spec2": null,
        "spec3": null,
        "addressCity": "Oakland",
        "state": "CA",
        "phone": "5104283590"
      }
    }
  },
  {
    "node": {
      "id": "Sm9obiBIYWxsaW5nLTEwNTQ5MA==",
      "title": "Dr. Jason C",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=JC"
        }
      },
      "doctorData": {
        "doctorsName": "Jason C",
        "zipcode": "94609",
        "practiceName": "Bay Children's Physicians",
        "speciality": "Pediatrics",
        "degree": "M.D.",
        "spec1": "Pediatrics",
        "spec2": null,
        "spec3": null,
        "addressCity": "Oakland",
        "state": "CA",
        "phone": "5104283590"
      }
    }
  },
  {
    "node": {
      "id": "TWljaGFlbCBNYWRlcmEtMTA1NTQ=",
      "title": "Dr. Sarah A",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=SA"
        }
      },
      "doctorData": {
        "doctorsName": "Sarah A",
        "zipcode": "94143",
        "practiceName": "UCSF",
        "speciality": "Pediatric Surgery",
        "degree": "M.D.",
        "spec1": "Pediatric Surgery",
        "spec2": null,
        "spec3": null,
        "addressCity": "San Francisco",
        "state": "CA",
        "phone": "4154761000"
      }
    }
  },
  {
    "node": {
      "id": "RW1pbHkgS2VuZGFsbC0xMDYxNTY=",
      "title": "Dr. Malinda F",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=MF"
        }
      },
      "doctorData": {
        "doctorsName": "Malinda F",
        "zipcode": null,
        "practiceName": null,
        "speciality": "Nephrology",
        "degree": "M.D.",
        "spec1": "Nephrology",
        "spec2": "Internal Medicine",
        "spec3": null,
        "addressCity": null,
        "state": null,
        "phone": null
      }
    }
  },
  {
    "node": {
      "id": "U3RldmVuIE1hdGhlcnMtMTA3MjA4",
      "title": "Dr. Steven M",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=SM"
        }
      },
      "doctorData": {
        "doctorsName": "Steven M",
        "zipcode": "94598",
        "practiceName": "BASS Medical Group",
        "speciality": "Urology",
        "degree": "M.D.",
        "spec1": "Urology",
        "spec2": null,
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259346610"
      }
    }
  },
  {
    "node": {
      "id": "UmF2aSBFZ2FuLUd1cnUgMTA3NzUy",
      "title": "Dr. Melissa D",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=MD"
        }
      },
      "doctorData": {
        "doctorsName": "Melissa D",
        "zipcode": "94598",
        "practiceName": "Muir Orthopaedic Specialists",
        "speciality": "Orthopaedic Surgery",
        "degree": "M.D.",
        "spec1": "Orthopaedic Surgery",
        "spec2": null,
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259398585"
      }
    }
  },
  {
    "node": {
      "id": "U3RlZmFuIEtpbGxpbmdzLTEwODcxNQ==",
      "title": "Dr. Arthur G",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=AG"
        }
      },
      "doctorData": {
        "doctorsName": "Arthur G",
        "zipcode": "94598",
        "practiceName": "Muir Orthopaedic Specialists",
        "speciality": "Orthopaedic Surgery",
        "degree": "M.D.",
        "spec1": "Orthopaedic Surgery",
        "spec2": null,
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259398585"
      }
    }
  },
  {
    "node": {
      "id": "QnJpYW4gUGFya2VyLTEwODg2NA==",
      "title": "Dr. Robert P",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=RP"
        }
      },
      "doctorData": {
        "doctorsName": "Robert P",
        "zipcode": null,
        "practiceName": null,
        "speciality": "Nephrology",
        "degree": "M.D.",
        "spec1": "Nephrology",
        "spec2": "Internal Medicine",
        "spec3": null,
        "addressCity": null,
        "state": null,
        "phone": null
      }
    }
  },
  {
    "node": {
      "id": "U3RlcGhlbiBHdWRlbWFuLTEwODkwMg==",
      "title": "Dr. John A",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=JA"
        }
      },
      "doctorData": {
        "doctorsName": "John A",
        "zipcode": "94609",
        "practiceName": "Bay Children's Physicians",
        "speciality": "Pediatrics",
        "degree": "M.D.",
        "spec1": "Pediatrics",
        "spec2": null,
        "spec3": null,
        "addressCity": "Oakland",
        "state": "CA",
        "phone": "5104283590"
      }
    }
  },
  {
    "node": {
      "id": "U3RldmVuIEhlYWxzLTEwOTIzNA==",
      "title": "Dr. William C",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=WC"
        }
      },
      "doctorData": {
        "doctorsName": "William C",
        "zipcode": "94598",
        "practiceName": "Muir Orthopaedic Specialists",
        "speciality": "Orthopaedic Surgery",
        "degree": "M.D.",
        "spec1": "Orthopaedic Surgery",
        "spec2": null,
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259398585"
      }
    }
  },
  {
    "node": {
      "id": "TWljaGFlbCBCb3lsZS0xMDkzMA==",
      "title": "Dr. John P",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=JP"
        }
      },
      "doctorData": {
        "doctorsName": "John P",
        "zipcode": "94609",
        "practiceName": "Bay Children's Physicians",
        "speciality": "Pediatrics",
        "degree": "M.D.",
        "spec1": "Pediatrics",
        "spec2": null,
        "spec3": null,
        "addressCity": "Oakland",
        "state": "CA",
        "phone": "5104283590"
      }
    }
  },
  {
    "node": {
      "id": "RGF2aWQgV2VsbHMtMTEwOTI=",
      "title": "Dr. Thomas F",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=TF"
        }
      },
      "doctorData": {
        "doctorsName": "Thomas F",
        "zipcode": "94143",
        "practiceName": "UCSF",
        "speciality": "Pediatric Infectious Diseases",
        "degree": "M.D.",
        "spec1": "Pediatric Infectious Diseases",
        "spec2": null,
        "spec3": null,
        "addressCity": "San Francisco",
        "state": "CA",
        "phone": "4153532813"
      }
    }
  },
  {
    "node": {
      "id": "RHVwaGFuIEthZGlhbS0xMTExMA==",
      "title": "Dr. Kenneth G",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=KG"
        }
      },
      "doctorData": {
        "doctorsName": "Kenneth G",
        "zipcode": "94609",
        "practiceName": "UCSF",
        "speciality": "Pediatric Infectious Diseases",
        "degree": "M.D.",
        "spec1": "Pediatric Infectious Diseases",
        "spec2": null,
        "spec3": null,
        "addressCity": "Oakland",
        "state": "CA",
        "phone": "5104283838"
      }
    }
  },
  {
    "node": {
      "id": "SmFtZXMgS2FydC0xMTU0OTk=",
      "title": "Dr. Mark H",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=MH"
        }
      },
      "doctorData": {
        "doctorsName": "Mark H",
        "zipcode": "94143",
        "practiceName": "UCSF",
        "speciality": "Pediatric Infectious Diseases",
        "degree": "M.D.",
        "spec1": "Pediatric Infectious Diseases",
        "spec2": null,
        "spec3": null,
        "addressCity": "San Francisco",
        "state": "CA",
        "phone": "4153532813"
      }
    }
  },
  {
    "node": {
      "id": "QnJpYW4gUGV0ZXJzb24tMTE1NjY=",
      "title": "Dr. Brian R",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=BR"
        }
      },
      "doctorData": {
        "doctorsName": "Brian R",
        "zipcode": "94143",
        "practiceName": "UCSF",
        "speciality": "Pediatric Infectious Diseases",
        "degree": "M.D.",
        "spec1": "Pediatric Infectious Diseases",
        "spec2": null,
        "spec3": null,
        "addressCity": "San Francisco",
        "state": "CA",
        "phone": "4153532813"
      }
    }
  },
  {
    "node": {
      "id": "TWljaGFlbCBNYWxsZXR0ZS0xMjc0NzAwMA==",
      "title": "Dr. Michael Mallette",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=MM"
        }
      },
      "doctorData": {
        "doctorsName": "Michael Mallette",
        "zipcode": "94553",
        "practiceName": "BASS Medical Group",
        "speciality": "Nephrology",
        "degree": "M.D.",
        "spec1": "Nephrology",
        "spec2": "Internal Medicine",
        "spec3": null,
        "addressCity": "Pacheco",
        "state": "CA",
        "phone": "9256801999"
      }
    }
  },
  {
    "node": {
      "id": "QWxhbiBBc3Npc3QtMTQ0MDMx",
      "title": "Dr. Alan Assist",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=AA"
        }
      },
      "doctorData": {
        "doctorsName": "Alan Assist",
        "zipcode": "94598",
        "practiceName": "Muir Orthopaedic Specialists",
        "speciality": "Orthopaedic Surgery",
        "degree": "M.D.",
        "spec1": "Orthopaedic Surgery",
        "spec2": null,
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259398585"
      }
    }
  },
  {
    "node": {
      "id": "TWljaGFlbCBNYWxsZXR0ZS0xMjc0NzAwMA==",
      "title": "Dr. Paul E",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=PE"
        }
      },
      "doctorData": {
        "doctorsName": "Paul E",
        "zipcode": "94609",
        "practiceName": "East Bay Newborn Specialists, Inc",
        "speciality": "Neonatal-Perinatal Medicine",
        "degree": "M.D.",
        "spec1": "Neonatal-Perinatal Medicine",
        "spec2": null,
        "spec3": null,
        "addressCity": "Oakland",
        "state": "CA",
        "phone": "5104283276"
      }
    }
  },
  {
    "node": {
      "id": "QWxhbiBBc3Npc3QtMTQ0MDMx",
      "title": "Dr. Susan S",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=SS"
        }
      },
      "doctorData": {
        "doctorsName": "Susan S",
        "zipcode": "94598",
        "practiceName": "Muir Orthopaedic Specialists",
        "speciality": "Orthopaedic Surgery",
        "degree": "M.D.",
        "spec1": "Orthopaedic Surgery",
        "spec2": null,
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259398585"
      }
    }
  },
  {
    "node": {
      "id": "RHVwaGFuIEthZGlhbS0xMTExMA==",
      "title": "Dr. James P",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=JP"
        }
      },
      "doctorData": {
        "doctorsName": "James P",
        "zipcode": "94609",
        "practiceName": "East Bay Newborn Specialists, Inc",
        "speciality": "Neonatal-Perinatal Medicine",
        "degree": "M.D.",
        "spec1": "Neonatal-Perinatal Medicine",
        "spec2": null,
        "spec3": null,
        "addressCity": "Oakland",
        "state": "CA",
        "phone": "5104283276"
      }
    }
  },
  {
    "node": {
      "id": "U2hlaWxhIEplbmtpbnMtMTAyMjU3",
      "title": "Dr. Charles S",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=CS"
        }
      },
      "doctorData": {
        "doctorsName": "Charles S",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "V2VuZHkgV29uZy0xMDI2MTE0MA==",
      "title": "Dr. Andrew W",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=AW"
        }
      },
      "doctorData": {
        "doctorsName": "Andrew W",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "QnJpYW4gUGV0ZXJzb24tMTE1NjY=",
      "title": "Dr. Joseph S",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=JS"
        }
      },
      "doctorData": {
        "doctorsName": "Joseph S",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "VGhvY2ggUGhhbi0xNDc2NzI=",
      "title": "Dr. Thoch Phan",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=TP"
        }
      },
      "doctorData": {
        "doctorsName": "Thoch Phan",
        "zipcode": null,
        "practiceName": null,
        "speciality": "Obstetrics and Gynecology",
        "degree": "M.D.",
        "spec1": null,
        "spec2": null,
        "spec3": null,
        "addressCity": null,
        "state": null,
        "phone": null
      }
    }
  },
  {
    "node": {
      "id": "SGFyb2xkIFRhbmctaTE1NDIyOQ==",
      "title": "Dr. Harold Tang",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=HT"
        }
      },
      "doctorData": {
        "doctorsName": "Harold Tang",
        "zipcode": "94609",
        "practiceName": "Bay Children's Physicians",
        "speciality": "Pediatrics",
        "degree": "M.D.",
        "spec1": "Pediatrics",
        "spec2": null,
        "spec3": null,
        "addressCity": "Oakland",
        "state": "CA",
        "phone": "5104283590"
      }
    }
  },
  {
    "node": {
      "id": "SmFtZXMgTmllbGFuLTE1ODI5",
      "title": "Dr. James Nielan",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=JN"
        }
      },
      "doctorData": {
        "doctorsName": "James Nielan",
        "zipcode": "94609",
        "practiceName": "Bay Children's Physicians",
        "speciality": "Pediatrics",
        "degree": "M.D.",
        "spec1": "Pediatrics",
        "spec2": null,
        "spec3": null,
        "addressCity": "Oakland",
        "state": "CA",
        "phone": "5104283590"
      }
    }
  },
  {
    "node": {
      "id": "QXJ2aW5kIENob3VkcnktMTU4NDg=",
      "title": "Dr. Arvind Choudry",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=AC"
        }
      },
      "doctorData": {
        "doctorsName": "Arvind Choudry",
        "zipcode": "94553",
        "practiceName": "BASS Medical Group",
        "speciality": "Internal Medicine",
        "degree": "M.D.",
        "spec1": "Internal Medicine",
        "spec2": null,
        "spec3": null,
        "addressCity": "Pacheco",
        "state": "CA",
        "phone": "9256801999"
      }
    }
  },
  {
    "node": {
      "id": "SmFtZXMgRG9lLTE1OTgwMA==",
      "title": "Dr. James Doe",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=JD"
        }
      },
      "doctorData": {
        "doctorsName": "James Doe",
        "zipcode": null,
        "practiceName": null,
        "speciality": "Orthopaedic Surgery",
        "degree": "M.D.",
        "spec1": null,
        "spec2": null,
        "spec3": null,
        "addressCity": null,
        "state": null,
        "phone": null
      }
    }
  },
  {
    "node": {
      "id": "U3VzYW4gU2FsYmFuaS0xMDM3NzY=",
      "title": "Dr. Susan A",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=SA"
        }
      },
      "doctorData": {
        "doctorsName": "Susan A",
        "zipcode": "94609",
        "practiceName": "UCSF",
        "speciality": "Pediatrics",
        "degree": "M.D.",
        "spec1": "Pediatrics",
        "spec2": null,
        "spec3": null,
        "addressCity": "Oakland",
        "state": "CA",
        "phone": "5104283838"
      }
    }
  },
  {
    "node": {
      "id": "TWFsaW5kYSBGbGVtc3Rlci0xMDQyNzE=",
      "title": "Dr. Steven D",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=SD"
        }
      },
      "doctorData": {
        "doctorsName": "Steven D",
        "zipcode": "94143",
        "practiceName": "UCSF",
        "speciality": "Pediatric Infectious Diseases",
        "degree": "M.D.",
        "spec1": "Pediatric Infectious Diseases",
        "spec2": null,
        "spec3": null,
        "addressCity": "San Francisco",
        "state": "CA",
        "phone": "4153532813"
      }
    }
  },
  {
    "node": {
      "id": "SmFtZXMgTWlsbGVyLTEwNTIy",
      "title": "Dr. Robert P",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=RP"
        }
      },
      "doctorData": {
        "doctorsName": "Robert P",
        "zipcode": null,
        "practiceName": null,
        "speciality": "Nephrology",
        "degree": "M.D.",
        "spec1": "Nephrology",
        "spec2": "Internal Medicine",
        "spec3": null,
        "addressCity": null,
        "state": null,
        "phone": null
      }
    }
  },
  {
    "node": {
      "id": "Sm9obiBIYWxsaW5nLTEwNTQ5MA==",
      "title": "Dr. John A",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=JA"
        }
      },
      "doctorData": {
        "doctorsName": "John A",
        "zipcode": "94609",
        "practiceName": "Bay Children's Physicians",
        "speciality": "Pediatrics",
        "degree": "M.D.",
        "spec1": "Pediatrics",
        "spec2": null,
        "spec3": null,
        "addressCity": "Oakland",
        "state": "CA",
        "phone": "5104283590"
      }
    }
  },

  {
    "node": {
      "id": "TWljaGFlbCBNYWRlcmEtMTA1NTQ=",
      "title": "Dr. Melissa D",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=MD"
        }
      },
      "doctorData": {
        "doctorsName": "Melissa D",
        "zipcode": "94598",
        "practiceName": "Muir Orthopaedic Specialists",
        "speciality": "Orthopaedic Surgery",
        "degree": "M.D.",
        "spec1": "Orthopaedic Surgery",
        "spec2": null,
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259398585"
      }
    }
  },
  {
    "node": {
      "id": "RW1pbHkgS2VuZGFsbC0xMDYxNTY=",
      "title": "Dr. Arthur G",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=AG"
        }
      },
      "doctorData": {
        "doctorsName": "Arthur G",
        "zipcode": "94598",
        "practiceName": "Muir Orthopaedic Specialists",
        "speciality": "Orthopaedic Surgery",
        "degree": "M.D.",
        "spec1": "Orthopaedic Surgery",
        "spec2": null,
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259398585"
      }
    }
  },
  {
    "node": {
      "id": "U3RldmVuIE1hdGhlcnMtMTA3MjA4",
      "title": "Dr. William C",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=WC"
        }
      },
      "doctorData": {
        "doctorsName": "William C",
        "zipcode": "94598",
        "practiceName": "Muir Orthopaedic Specialists",
        "speciality": "Orthopaedic Surgery",
        "degree": "M.D.",
        "spec1": "Orthopaedic Surgery",
        "spec2": null,
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259398585"
      }
    }
  },
  {
    "node": {
      "id": "TWF0dGhldyBHaWxwYXRyaWNrLTEwNzc1",
      "title": "Dr. Joseph S",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=JS"
        }
      },
      "doctorData": {
        "doctorsName": "Joseph S",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "UmF2aSBFZ2FuLUd1cnUgMTA3NzUy",
      "title": "Dr. David M",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=DM"
        }
      },
      "doctorData": {
        "doctorsName": "David M",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "U3RlZmFuIEtpbGxpbmdzLTEwODcxNQ==",
      "title": "Dr. Robert S",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=RS"
        }
      },
      "doctorData": {
        "doctorsName": "Robert S",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "QnJpYW4gUGFya2VyLTEwODg2NA==",
      "title": "Dr. David A",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=DA"
        }
      },
      "doctorData": {
        "doctorsName": "David A",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "U3RlcGhlbiBHdWRlbWFuLTEwODkwMg==",
      "title": "Dr. John A",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=JA"
        }
      },
      "doctorData": {
        "doctorsName": "John A",
        "zipcode": "94609",
        "practiceName": "Bay Children's Physicians",
        "speciality": "Pediatrics",
        "degree": "M.D.",
        "spec1": "Pediatrics",
        "spec2": null,
        "spec3": null,
        "addressCity": "Oakland",
        "state": "CA",
        "phone": "5104283590"
      }
    }
  },
  {
    "node": {
      "id": "U3RldmVuIEhlYWxzLTEwOTIzNA==",
      "title": "Dr. Christopher A",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=CA"
        }
      },
      "doctorData": {
        "doctorsName": "Christopher A",
        "zipcode": "94609",
        "practiceName": "UCSF",
        "speciality": "Pediatrics",
        "degree": "M.D.",
        "spec1": "Pediatrics",
        "spec2": null,
        "spec3": null,
        "addressCity": "Oakland",
        "state": "CA",
        "phone": "5104283838"
      }
    }
  },
  {
    "node": {
      "id": "TWljaGFlbCBCb3lsZS0xMDkzMA==",
      "title": "Dr. Joseph S",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=JS"
        }
      },
      "doctorData": {
        "doctorsName": "Joseph S",
        "zipcode": "94609",
        "practiceName": "UCSF",
        "speciality": "Pediatrics",
        "degree": "M.D.",
        "spec1": "Pediatrics",
        "spec2": null,
        "spec3": null,
        "addressCity": "Oakland",
        "state": "CA",
        "phone": "5104283838"
      }
    }
  },
 
  {
    "node": {
      "id": "RHVwaGFuIEthZGlhbS0xMTExMA==",
      "title": "Dr. Jennifer N",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=JN"
        }
      },
      "doctorData": {
        "doctorsName": "Jennifer N",
        "zipcode": "94143",
        "practiceName": "UCSF",
        "speciality": "Pediatrics",
        "degree": "M.D.",
        "spec1": "Pediatrics",
        "spec2": null,
        "spec3": null,
        "addressCity": "San Francisco",
        "state": "CA",
        "phone": "4154761000"
      }
    }
  },
  {
    "node": {
      "id": "SmFtZXMgS2FydC0xMTU0OTk=",
      "title": "Dr. Malinda M",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=MM"
        }
      },
      "doctorData": {
        "doctorsName": "Malinda M",
        "zipcode": "94143",
        "practiceName": "UCSF",
        "speciality": "Pediatrics",
        "degree": "M.D.",
        "spec1": "Pediatrics",
        "spec2": null,
        "spec3": null,
        "addressCity": "San Francisco",
        "state": "CA",
        "phone": "4154761000"
      }
    }
  },
  {
    "node": {
      "id": "QnJpYW4gUGV0ZXJzb24tMTE1NjY=",
      "title": "Dr. Susan S",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=SS"
        }
      },
      "doctorData": {
        "doctorsName": "Susan S",
        "zipcode": "94143",
        "practiceName": "UCSF",
        "speciality": "Pediatrics",
        "degree": "M.D.",
        "spec1": "Pediatrics",
        "spec2": null,
        "spec3": null,
        "addressCity": "San Francisco",
        "state": "CA",
        "phone": "4154761000"
      }
    }
  },
  {
    "node": {
      "id": "TWljaGFlbCBNYWxsZXR0ZS0xMjc0NzAwMA==",
      "title": "Dr. Stephanie B",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=SB"
        }
      },
      "doctorData": {
        "doctorsName": "Stephanie B",
        "zipcode": "94553",
        "practiceName": "BASS Medical Group",
        "speciality": "Internal Medicine",
        "degree": "M.D.",
        "spec1": "Internal Medicine",
        "spec2": null,
        "spec3": null,
        "addressCity": "Pacheco",
        "state": "CA",
        "phone": "9256801999"
      }
    }
  },
  {
    "node": {
      "id": "QWxhbiBBc3Npc3QtMTQ0MDMx",
      "title": "Dr. Arthur G",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=AG"
        }
      },
      "doctorData": {
        "doctorsName": "Arthur G",
        "zipcode": "94598",
        "practiceName": "Muir Orthopaedic Specialists",
        "speciality": "Orthopaedic Surgery",
        "degree": "M.D.",
        "spec1": "Orthopaedic Surgery",
        "spec2": null,
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259398585"
      }
    }
  },
  {
    "node": {
      "id": "TWljaGFlbCBNYWxsZXR0ZS0xMjc0NzAwMA==",
      "title": "Dr. Andrew W",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=AW"
        }
      },
      "doctorData": {
        "doctorsName": "Andrew W",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "QWxhbiBBc3Npc3QtMTQ0MDMx",
      "title": "Dr. Joseph S",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=JS"
        }
      },
      "doctorData": {
        "doctorsName": "Joseph S",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "TWFsaW5kYSBGbGVtc3Rlci0xMDQyNzE=",
      "title": "Dr. David M",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=DM"
        }
      },
      "doctorData": {
        "doctorsName": "David M",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "U3RlcGhhbiBDaGVuLTEwNDkz",
      "title": "Dr. Robert S",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=RS"
        }
      },
      "doctorData": {
        "doctorsName": "Robert S",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "SmFtZXMgTWlsbGVyLTEwNTIy",
      "title": "Dr. David A",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=DA"
        }
      },
      "doctorData": {
        "doctorsName": "David A",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "Sm9obiBIYWxsaW5nLTEwNTQ5MA==",
      "title": "Dr. Stephen B",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=SB"
        }
      },
      "doctorData": {
        "doctorsName": "Stephen B",
        "zipcode": "94553",
        "practiceName": "BASS Medical Group",
        "speciality": "Internal Medicine",
        "degree": "M.D.",
        "spec1": "Internal Medicine",
        "spec2": null,
        "spec3": null,
        "addressCity": "Pacheco",
        "state": "CA",
        "phone": "9256801999"
      }
    }
  },
  {
    "node": {
      "id": "TWljaGFlbCBNYWRlcmEtMTA1NTQ=",
      "title": "Dr. Joseph S",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=JS"
        }
      },
      "doctorData": {
        "doctorsName": "Joseph S",
        "zipcode": "94609",
        "practiceName": "UCSF",
        "speciality": "Pediatrics",
        "degree": "M.D.",
        "spec1": "Pediatrics",
        "spec2": null,
        "spec3": null,
        "addressCity": "Oakland",
        "state": "CA",
        "phone": "5104283838"
      }
    }
  },
 
  {
    "node": {
      "id": "TWF0dGhldyBHaWxwYXRyaWNrLTEwNzc1",
      "title": "Dr. Jennifer N",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=JN"
        }
      },
      "doctorData": {
        "doctorsName": "Jennifer N",
        "zipcode": "94143",
        "practiceName": "UCSF",
        "speciality": "Pediatrics",
        "degree": "M.D.",
        "spec1": "Pediatrics",
        "spec2": null,
        "spec3": null,
        "addressCity": "San Francisco",
        "state": "CA",
        "phone": "4154761000"
      }
    }
  },
  {
    "node": {
      "id": "UmF2aSBFZ2FuLUd1cnUgMTA3NzUy",
      "title": "Dr. Malinda M",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=MM"
        }
      },
      "doctorData": {
        "doctorsName": "Malinda M",
        "zipcode": "94143",
        "practiceName": "UCSF",
        "speciality": "Pediatrics",
        "degree": "M.D.",
        "spec1": "Pediatrics",
        "spec2": null,
        "spec3": null,
        "addressCity": "San Francisco",
        "state": "CA",
        "phone": "4154761000"
      }
    }
  },
  {
    "node": {
      "id": "U3RlZmFuIEtpbGxpbmdzLTEwODcxNQ==",
      "title": "Dr. Susan S",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=SS"
        }
      },
      "doctorData": {
        "doctorsName": "Susan S",
        "zipcode": "94143",
        "practiceName": "UCSF",
        "speciality": "Pediatrics",
        "degree": "M.D.",
        "spec1": "Pediatrics",
        "spec2": null,
        "spec3": null,
        "addressCity": "San Francisco",
        "state": "CA",
        "phone": "4154761000"
      }
    }
  },
  {
    "node": {
      "id": "QnJpYW4gUGFya2VyLTEwODg2NA==",
      "title": "Dr. Thomas F",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=TF"
        }
      },
      "doctorData": {
        "doctorsName": "Thomas F",
        "zipcode": "94143",
        "practiceName": "UCSF",
        "speciality": "Pediatric Infectious Diseases",
        "degree": "M.D.",
        "spec1": "Pediatric Infectious Diseases",
        "spec2": null,
        "spec3": null,
        "addressCity": "San Francisco",
        "state": "CA",
        "phone": "4153532813"
      }
    }
  },
  {
    "node": {
      "id": "U3RlcGhlbiBHdWRlbWFuLTEwODkwMg==",
      "title": "Dr. Kenneth G",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=KG"
        }
      },
      "doctorData": {
        "doctorsName": "Kenneth G",
        "zipcode": "94609",
        "practiceName": "UCSF",
        "speciality": "Pediatric Infectious Diseases",
        "degree": "M.D.",
        "spec1": "Pediatric Infectious Diseases",
        "spec2": null,
        "spec3": null,
        "addressCity": "Oakland",
        "state": "CA",
        "phone": "5104283838"
      }
    }
  },
  {
    "node": {
      "id": "U3RldmVuIEhlYWxzLTEwOTIzNA==",
      "title": "Dr. Mark H",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=MH"
        }
      },
      "doctorData": {
        "doctorsName": "Mark H",
        "zipcode": "94143",
        "practiceName": "UCSF",
        "speciality": "Pediatric Infectious Diseases",
        "degree": "M.D.",
        "spec1": "Pediatric Infectious Diseases",
        "spec2": null,
        "spec3": null,
        "addressCity": "San Francisco",
        "state": "CA",
        "phone": "4153532813"
      }
    }
  },
  {
    "node": {
      "id": "TWljaGFlbCBCb3lsZS0xMDkzMA==",
      "title": "Dr. Brian R",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=BR"
        }
      },
      "doctorData": {
        "doctorsName": "Brian R",
        "zipcode": "94143",
        "practiceName": "UCSF",
        "speciality": "Pediatric Infectious Diseases",
        "degree": "M.D.",
        "spec1": "Pediatric Infectious Diseases",
        "spec2": null,
        "spec3": null,
        "addressCity": "San Francisco",
        "state": "CA",
        "phone": "4153532813"
      }
    }
  },
  {
    "node": {
      "id": "RGF2aWQgV2VsbHMtMTEwOTI=",
      "title": "Dr. Michael Mallette",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=MM"
        }
      },
      "doctorData": {
        "doctorsName": "Michael Mallette",
        "zipcode": "94553",
        "practiceName": "BASS Medical Group",
        "speciality": "Nephrology",
        "degree": "M.D.",
        "spec1": "Nephrology",
        "spec2": "Internal Medicine",
        "spec3": null,
        "addressCity": "Pacheco",
        "state": "CA",
        "phone": "9256801999"
      }
    }
  },
  {
    "node": {
      "id": "RHVwaGFuIEthZGlhbS0xMTExMA==",
      "title": "Dr. Christopher A",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=CA"
        }
      },
      "doctorData": {
        "doctorsName": "Christopher A",
        "zipcode": "94609",
        "practiceName": "UCSF",
        "speciality": "Pediatrics",
        "degree": "M.D.",
        "spec1": "Pediatrics",
        "spec2": null,
        "spec3": null,
        "addressCity": "Oakland",
        "state": "CA",
        "phone": "5104283838"
      }
    }
  },
  {
    "node": {
      "id": "SmFtZXMgS2FydC0xMTU0OTk=",
      "title": "Dr. Joseph S",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=JS"
        }
      },
      "doctorData": {
        "doctorsName": "Joseph S",
        "zipcode": "94609",
        "practiceName": "UCSF",
        "speciality": "Pediatrics",
        "degree": "M.D.",
        "spec1": "Pediatrics",
        "spec2": null,
        "spec3": null,
        "addressCity": "Oakland",
        "state": "CA",
        "phone": "5104283838"
      }
    }
  },
  
  {
    "node": {
      "id": "TWljaGFlbCBNYWxsZXR0ZS0xMjc0NzAwMA==",
      "title": "Dr. Jennifer N",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=JN"
        }
      },
      "doctorData": {
        "doctorsName": "Jennifer N",
        "zipcode": "94143",
        "practiceName": "UCSF",
        "speciality": "Pediatrics",
        "degree": "M.D.",
        "spec1": "Pediatrics",
        "spec2": null,
        "spec3": null,
        "addressCity": "San Francisco",
        "state": "CA",
        "phone": "4154761000"
      }
    }
  },
  {
    "node": {
      "id": "QWxhbiBBc3Npc3QtMTQ0MDMx",
      "title": "Dr. Malinda M",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=MM"
        }
      },
      "doctorData": {
        "doctorsName": "Malinda M",
        "zipcode": "94143",
        "practiceName": "UCSF",
        "speciality": "Pediatrics",
        "degree": "M.D.",
        "spec1": "Pediatrics",
        "spec2": null,
        "spec3": null,
        "addressCity": "San Francisco",
        "state": "CA",
        "phone": "4154761000"
      }
    }
  },
  {
    "node": {
      "id": "TWljaGFlbCBNYWxsZXR0ZS0xMjc0NzAwMA==",
      "title": "Dr. Susan S",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=SS"
        }
      },
      "doctorData": {
        "doctorsName": "Susan S",
        "zipcode": "94143",
        "practiceName": "UCSF",
        "speciality": "Pediatrics",
        "degree": "M.D.",
        "spec1": "Pediatrics",
        "spec2": null,
        "spec3": null,
        "addressCity": "San Francisco",
        "state": "CA",
        "phone": "4154761000"
      }
    }
  },
  {
    "node": {
      "id": "TWFsaW5kYSBGbGVtc3Rlci0xMDQyNzE=",
      "title": "Dr. Stephanie B",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=SB"
        }
      },
      "doctorData": {
        "doctorsName": "Stephanie B",
        "zipcode": "94553",
        "practiceName": "BASS Medical Group",
        "speciality": "Internal Medicine",
        "degree": "M.D.",
        "spec1": "Internal Medicine",
        "spec2": null,
        "spec3": null,
        "addressCity": "Pacheco",
        "state": "CA",
        "phone": "9256801999"
      }
    }
  },
  {
    "node": {
      "id": "U3RlcGhhbiBDaGVuLTEwNDkz",
      "title": "Dr. Arthur G",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=AG"
        }
      },
      "doctorData": {
        "doctorsName": "Arthur G",
        "zipcode": "94598",
        "practiceName": "Muir Orthopaedic Specialists",
        "speciality": "Orthopaedic Surgery",
        "degree": "M.D.",
        "spec1": "Orthopaedic Surgery",
        "spec2": null,
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259398585"
      }
    }
  },
  {
    "node": {
      "id": "SmFtZXMgTWlsbGVyLTEwNTIy",
      "title": "Dr. Andrew W",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=AW"
        }
      },
      "doctorData": {
        "doctorsName": "Andrew W",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "Sm9obiBIYWxsaW5nLTEwNTQ5MA==",
      "title": "Dr. Joseph S",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=JS"
        }
      },
      "doctorData": {
        "doctorsName": "Joseph S",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "TWljaGFlbCBNYWRlcmEtMTA1NTQ=",
      "title": "Dr. David M",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=DM"
        }
      },
      "doctorData": {
        "doctorsName": "David M",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "RW1pbHkgS2VuZGFsbC0xMDYxNTY=",
      "title": "Dr. Robert S",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=RS"
        }
      },
      "doctorData": {
        "doctorsName": "Robert S",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "U3RldmVuIE1hdGhlcnMtMTA3MjA4",
      "title": "Dr. David A",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=DA"
        }
      },
      "doctorData": {
        "doctorsName": "David A",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "TWF0dGhldyBHaWxwYXRyaWNrLTEwNzc1",
      "title": "Dr. Stephen B",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=SB"
        }
      },
      "doctorData": {
        "doctorsName": "Stephen B",
        "zipcode": "94553",
        "practiceName": "BASS Medical Group",
        "speciality": "Internal Medicine",
        "degree": "M.D.",
        "spec1": "Internal Medicine",
        "spec2": null,
        "spec3": null,
        "addressCity": "Pacheco",
        "state": "CA",
        "phone": "9256801999"
      }
    }
  },
  {
    "node": {
      "id": "UmF2aSBFZ2FuLUd1cnUgMTA3NzUy",
      "title": "Dr. Joseph S",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=JS"
        }
      },
      "doctorData": {
        "doctorsName": "Joseph S",
        "zipcode": "94609",
        "practiceName": "UCSF",
        "speciality": "Pediatrics",
        "degree": "M.D.",
        "spec1": "Pediatrics",
        "spec2": null,
        "spec3": null,
        "addressCity": "Oakland",
        "state": "CA",
        "phone": "5104283838"
      }
    }
  },
  
  {
    "node": {
      "id": "QnJpYW4gUGFya2VyLTEwODg2NA==",
      "title": "Dr. Jennifer N",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=JN"
        }
      },
      "doctorData": {
        "doctorsName": "Jennifer N",
        "zipcode": "94143",
        "practiceName": "UCSF",
        "speciality": "Pediatrics",
        "degree": "M.D.",
        "spec1": "Pediatrics",
        "spec2": null,
        "spec3": null,
        "addressCity": "San Francisco",
        "state": "CA",
        "phone": "4154761000"
      }
    }
  },
  {
    "node": {
      "id": "U3RlcGhlbiBHdWRlbWFuLTEwODkwMg==",
      "title": "Dr. Malinda M",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=MM"
        }
      },
      "doctorData": {
        "doctorsName": "Malinda M",
        "zipcode": "94143",
        "practiceName": "UCSF",
        "speciality": "Pediatrics",
        "degree": "M.D.",
        "spec1": "Pediatrics",
        "spec2": null,
        "spec3": null,
        "addressCity": "San Francisco",
        "state": "CA",
        "phone": "4154761000"
      }
    }
  },
  {
    "node": {
      "id": "U3RldmVuIEhlYWxzLTEwOTIzNA==",
      "title": "Dr. Susan S",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=SS"
        }
      },
      "doctorData": {
        "doctorsName": "Susan S",
        "zipcode": "94143",
        "practiceName": "UCSF",
        "speciality": "Pediatrics",
        "degree": "M.D.",
        "spec1": "Pediatrics",
        "spec2": null,
        "spec3": null,
        "addressCity": "San Francisco",
        "state": "CA",
        "phone": "4154761000"
      }
    }
  },
  {
    "node": {
      "id": "TWljaGFlbCBCb3lsZS0xMDkzMA==",
      "title": "Dr. Stephanie B",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=SB"
        }
      },
      "doctorData": {
        "doctorsName": "Stephanie B",
        "zipcode": "94553",
        "practiceName": "BASS Medical Group",
        "speciality": "Internal Medicine",
        "degree": "M.D.",
        "spec1": "Internal Medicine",
        "spec2": null,
        "spec3": null,
        "addressCity": "Pacheco",
        "state": "CA",
        "phone": "9256801999"
      }
    }
  },
  {
    "node": {
      "id": "RGF2aWQgV2VsbHMtMTEwOTI=",
      "title": "Dr. Thomas F",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=TF"
        }
      },
      "doctorData": {
        "doctorsName": "Thomas F",
        "zipcode": "94143",
        "practiceName": "UCSF",
        "speciality": "Pediatric Infectious Diseases",
        "degree": "M.D.",
        "spec1": "Pediatric Infectious Diseases",
        "spec2": null,
        "spec3": null,
        "addressCity": "San Francisco",
        "state": "CA",
        "phone": "4153532813"
      }
    }
  },
  {
    "node": {
      "id": "RHVwaGFuIEthZGlhbS0xMTExMA==",
      "title": "Dr. Kenneth G",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=KG"
        }
      },
      "doctorData": {
        "doctorsName": "Kenneth G",
        "zipcode": "94609",
        "practiceName": "UCSF",
        "speciality": "Pediatric Infectious Diseases",
        "degree": "M.D.",
        "spec1": "Pediatric Infectious Diseases",
        "spec2": null,
        "spec3": null,
        "addressCity": "Oakland",
        "state": "CA",
        "phone": "5104283838"
      }
    }
  },
  {
    "node": {
      "id": "SmFtZXMgS2FydC0xMTU0OTk=",
      "title": "Dr. Mark H",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=MH"
        }
      },
      "doctorData": {
        "doctorsName": "Mark H",
        "zipcode": "94143",
        "practiceName": "UCSF",
        "speciality": "Pediatric Infectious Diseases",
        "degree": "M.D.",
        "spec1": "Pediatric Infectious Diseases",
        "spec2": null,
        "spec3": null,
        "addressCity": "San Francisco",
        "state": "CA",
        "phone": "4153532813"
      }
    }
  },
  {
    "node": {
      "id": "QnJpYW4gUGV0ZXJzb24tMTE1NjY=",
      "title": "Dr. Brian R",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=BR"
        }
      },
      "doctorData": {
        "doctorsName": "Brian R",
        "zipcode": "94143",
        "practiceName": "UCSF",
        "speciality": "Pediatric Infectious Diseases",
        "degree": "M.D.",
        "spec1": "Pediatric Infectious Diseases",
        "spec2": null,
        "spec3": null,
        "addressCity": "San Francisco",
        "state": "CA",
        "phone": "4153532813"
      }
    }
  },
  {
    "node": {
      "id": "QXJ2aW5kIENob3VkcnktMTU4NDg=",
      "title": "Dr. Thoch Phan",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=TP"
        }
      },
      "doctorData": {
        "doctorsName": "Thoch Phan",
        "zipcode": null,
        "practiceName": null,
        "speciality": "Obstetrics and Gynecology",
        "degree": "M.D.",
        "spec1": null,
        "spec2": null,
        "spec3": null,
        "addressCity": null,
        "state": null,
        "phone": null
      }
    }
  },
  {
    "node": {
      "id": "SmFtZXMgRG9lLTE1OTgwMA==",
      "title": "Dr. Harold Tang",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=HT"
        }
      },
      "doctorData": {
        "doctorsName": "Harold Tang",
        "zipcode": "94609",
        "practiceName": "Bay Children's Physicians",
        "speciality": "Pediatrics",
        "degree": "M.D.",
        "spec1": "Pediatrics",
        "spec2": null,
        "spec3": null,
        "addressCity": "Oakland",
        "state": "CA",
        "phone": "5104283590"
      }
    }
  },
  {
    "node": {
      "id": "SmFtZXMgTWlsbGVyLTEwNTIy",
      "title": "Dr. James Nielan",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=JN"
        }
      },
      "doctorData": {
        "doctorsName": "James Nielan",
        "zipcode": "94609",
        "practiceName": "Bay Children's Physicians",
        "speciality": "Pediatrics",
        "degree": "M.D.",
        "spec1": "Pediatrics",
        "spec2": null,
        "spec3": null,
        "addressCity": "Oakland",
        "state": "CA",
        "phone": "5104283590"
      }
    }
  },
  {
    "node": {
      "id": "Sm9obiBIYWxsaW5nLTEwNTQ5MA==",
      "title": "Dr. Arvind Choudry",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=AC"
        }
      },
      "doctorData": {
        "doctorsName": "Arvind Choudry",
        "zipcode": "94553",
        "practiceName": "BASS Medical Group",
        "speciality": "Internal Medicine",
        "degree": "M.D.",
        "spec1": "Internal Medicine",
        "spec2": null,
        "spec3": null,
        "addressCity": "Pacheco",
        "state": "CA",
        "phone": "9256801999"
      }
    }
  },
  {
    "node": {
      "id": "TWljaGFlbCBNYWRlcmEtMTA1NTQ=",
      "title": "Dr. James Doe",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=JD"
        }
      },
      "doctorData": {
        "doctorsName": "James Doe",
        "zipcode": null,
        "practiceName": null,
        "speciality": "Orthopaedic Surgery",
        "degree": "M.D.",
        "spec1": null,
        "spec2": null,
        "spec3": null,
        "addressCity": null,
        "state": null,
        "phone": null
      }
    }
  },
  {
    "node": {
      "id": "U3VzYW4gU2FsYmFuaS0xMDM3NzY=",
      "title": "Dr. David A",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=DA"
        }
      },
      "doctorData": {
        "doctorsName": "David A",
        "zipcode": "94598",
        "practiceName": "Muir Orthopaedic Specialists",
        "speciality": "Orthopaedic Surgery",
        "degree": "M.D.",
        "spec1": "Orthopaedic Surgery",
        "spec2": null,
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259398585"
      }
    }
  },
  {
    "node": {
      "id": "TWFsaW5kYSBGbGVtc3Rlci0xMDQyNzE=",
      "title": "Dr. Thomas F",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=TF"
        }
      },
      "doctorData": {
        "doctorsName": "Thomas F",
        "zipcode": "94143",
        "practiceName": "UCSF",
        "speciality": "Pediatric Infectious Diseases",
        "degree": "M.D.",
        "spec1": "Pediatric Infectious Diseases",
        "spec2": null,
        "spec3": null,
        "addressCity": "San Francisco",
        "state": "CA",
        "phone": "4153532813"
      }
    }
  },
  {
    "node": {
      "id": "U3RlcGhhbiBDaGVuLTEwNDkz",
      "title": "Dr. Kenneth G",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=KG"
        }
      },
      "doctorData": {
        "doctorsName": "Kenneth G",
        "zipcode": "94609",
        "practiceName": "UCSF",
        "speciality": "Pediatric Infectious Diseases",
        "degree": "M.D.",
        "spec1": "Pediatric Infectious Diseases",
        "spec2": null,
        "spec3": null,
        "addressCity": "Oakland",
        "state": "CA",
        "phone": "5104283838"
      }
    }
  },
  {
    "node": {
      "id": "SmFtZXMgTWlsbGVyLTEwNTIy",
      "title": "Dr. Mark H",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=MH"
        }
      },
      "doctorData": {
        "doctorsName": "Mark H",
        "zipcode": "94143",
        "practiceName": "UCSF",
        "speciality": "Pediatric Infectious Diseases",
        "degree": "M.D.",
        "spec1": "Pediatric Infectious Diseases",
        "spec2": null,
        "spec3": null,
        "addressCity": "San Francisco",
        "state": "CA",
        "phone": "4153532813"
      }
    }
  },
  {
    "node": {
      "id": "Sm9obiBIYWxsaW5nLTEwNTQ5MA==",
      "title": "Dr. Brian R",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=BR"
        }
      },
      "doctorData": {
        "doctorsName": "Brian R",
        "zipcode": "94143",
        "practiceName": "UCSF",
        "speciality": "Pediatric Infectious Diseases",
        "degree": "M.D.",
        "spec1": "Pediatric Infectious Diseases",
        "spec2": null,
        "spec3": null,
        "addressCity": "San Francisco",
        "state": "CA",
        "phone": "4153532813"
      }
    }
  },
  {
    "node": {
      "id": "TWljaGFlbCBNYWRlcmEtMTA1NTQ=",
      "title": "Dr. Charles S",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=CS"
        }
      },
      "doctorData": {
        "doctorsName": "Charles S",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "RW1pbHkgS2VuZGFsbC0xMDYxNTY=",
      "title": "Dr. Andrew W",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=AW"
        }
      },
      "doctorData": {
        "doctorsName": "Andrew W",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "U3RldmVuIE1hdGhlcnMtMTA3MjA4",
      "title": "Dr. Joseph S",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=JS"
        }
      },
      "doctorData": {
        "doctorsName": "Joseph S",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "TWF0dGhldyBHaWxwYXRyaWNrLTEwNzc1",
      "title": "Dr. David M",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=DM"
        }
      },
      "doctorData": {
        "doctorsName": "David M",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "UmF2aSBFZ2FuLUd1cnUgMTA3NzUy",
      "title": "Dr. Robert S",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=RS"
        }
      },
      "doctorData": {
        "doctorsName": "Robert S",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "U3RlZmFuIEtpbGxpbmdzLTEwODcxNQ==",
      "title": "Dr. David A",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=DA"
        }
      },
      "doctorData": {
        "doctorsName": "David A",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "QnJpYW4gUGFya2VyLTEwODg2NA==",
      "title": "Dr. David A",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=DA"
        }
      },
      "doctorData": {
        "doctorsName": "David A",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "U3RlcGhlbiBHdWRlbWFuLTEwODkwMg==",
      "title": "Dr. John M",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=JM"
        }
      },
      "doctorData": {
        "doctorsName": "John M",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "U3RldmVuIEhlYWxzLTEwOTIzNA==",
      "title": "Dr. Edward J",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=EJ"
        }
      },
      "doctorData": {
        "doctorsName": "Edward J",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "TWljaGFlbCBCb3lsZS0xMDkzMA==",
      "title": "Dr. David A",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=DA"
        }
      },
      "doctorData": {
        "doctorsName": "David A",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "RGF2aWQgV2VsbHMtMTEwOTI=",
      "title": "Dr. James C",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=JC"
        }
      },
      "doctorData": {
        "doctorsName": "James C",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "RHVwaGFuIEthZGlhbS0xMTExMA==",
      "title": "Dr. James C",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=JC"
        }
      },
      "doctorData": {
        "doctorsName": "James C",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "SmFtZXMgS2FydC0xMTU0OTk=",
      "title": "Dr. David W",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=DW"
        }
      },
      "doctorData": {
        "doctorsName": "David W",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "QnJpYW4gUGV0ZXJzb24tMTE1NjY=",
      "title": "Dr. Edward J",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=EJ"
        }
      },
      "doctorData": {
        "doctorsName": "Edward J",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "QWxhbiBBc3Npc3QtMTQ0MDMx",
      "title": "Dr. David A",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=DA"
        }
      },
      "doctorData": {
        "doctorsName": "David A",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  
  {
    "node": {
      "id": "TWFsaW5kYSBGbGVtc3Rlci0xMDQyNzE=",
      "title": "Dr. Melissa D",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=MD"
        }
      },
      "doctorData": {
        "doctorsName": "Melissa D",
        "zipcode": "94598",
        "practiceName": "Muir Orthopaedic Specialists",
        "speciality": "Orthopaedic Surgery",
        "degree": "M.D.",
        "spec1": "Orthopaedic Surgery",
        "spec2": null,
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259398585"
      }
    }
  },
  {
    "node": {
      "id": "U3RlcGhhbiBDaGVuLTEwNDkz",
      "title": "Dr. Arthur G",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=AG"
        }
      },
      "doctorData": {
        "doctorsName": "Arthur G",
        "zipcode": "94598",
        "practiceName": "Muir Orthopaedic Specialists",
        "speciality": "Orthopaedic Surgery",
        "degree": "M.D.",
        "spec1": "Orthopaedic Surgery",
        "spec2": null,
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259398585"
      }
    }
  },
  {
    "node": {
      "id": "SmFtZXMgTWlsbGVyLTEwNTIy",
      "title": "Dr. William C",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=WC"
        }
      },
      "doctorData": {
        "doctorsName": "William C",
        "zipcode": "94598",
        "practiceName": "Muir Orthopaedic Specialists",
        "speciality": "Orthopaedic Surgery",
        "degree": "M.D.",
        "spec1": "Orthopaedic Surgery",
        "spec2": null,
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259398585"
      }
    }
  },
  {
    "node": {
      "id": "Sm9obiBIYWxsaW5nLTEwNTQ5MA==",
      "title": "Dr. Joseph S",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=JS"
        }
      },
      "doctorData": {
        "doctorsName": "Joseph S",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "TWljaGFlbCBNYWRlcmEtMTA1NTQ=",
      "title": "Dr. David M",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=DM"
        }
      },
      "doctorData": {
        "doctorsName": "David M",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "RW1pbHkgS2VuZGFsbC0xMDYxNTY=",
      "title": "Dr. Robert S",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=RS"
        }
      },
      "doctorData": {
        "doctorsName": "Robert S",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "U3RldmVuIE1hdGhlcnMtMTA3MjA4",
      "title": "Dr. David A",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=DA"
        }
      },
      "doctorData": {
        "doctorsName": "David A",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "TWF0dGhldyBHaWxwYXRyaWNrLTEwNzc1",
      "title": "Dr. Stephen B",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=SB"
        }
      },
      "doctorData": {
        "doctorsName": "Stephen B",
        "zipcode": "94553",
        "practiceName": "BASS Medical Group",
        "speciality": "Internal Medicine",
        "degree": "M.D.",
        "spec1": "Internal Medicine",
        "spec2": null,
        "spec3": null,
        "addressCity": "Pacheco",
        "state": "CA",
        "phone": "9256801999"
      }
    }
  },
  {
    "node": {
      "id": "UmF2aSBFZ2FuLUd1cnUgMTA3NzUy",
      "title": "Dr. Joseph S",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=JS"
        }
      },
      "doctorData": {
        "doctorsName": "Joseph S",
        "zipcode": "94609",
        "practiceName": "UCSF",
        "speciality": "Pediatrics",
        "degree": "M.D.",
        "spec1": "Pediatrics",
        "spec2": null,
        "spec3": null,
        "addressCity": "Oakland",
        "state": "CA",
        "phone": "5104283838"
      }
    }
  },
  {
    "node": {
      "id": "U3RlZmFuIEtpbGxpbmdzLTEwODcxNQ==",
      "title": "Dr. Daniel W",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=DW"
        }
      },
      "doctorData": {
        "doctorsName": "Daniel W",
        "zipcode": "94609",
        "practiceName": "UCSF",
        "speciality": "Pediatrics",
        "degree": "M.D.",
        "spec1": "Pediatrics",
        "spec2": null,
        "spec3": null,
        "addressCity": "Oakland",
        "state": "CA",
        "phone": "5104283838"
      }
    }
  },
  {
    "node": {
      "id": "QnJpYW4gUGFya2VyLTEwODg2NA==",
      "title": "Dr. Jennifer N",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=JN"
        }
      },
      "doctorData": {
        "doctorsName": "Jennifer N",
        "zipcode": "94143",
        "practiceName": "UCSF",
        "speciality": "Pediatrics",
        "degree": "M.D.",
        "spec1": "Pediatrics",
        "spec2": null,
        "spec3": null,
        "addressCity": "San Francisco",
        "state": "CA",
        "phone": "4154761000"
      }
    }
  },
  {
    "node": {
      "id": "U3RlcGhlbiBHdWRlbWFuLTEwODkwMg==",
      "title": "Dr. Malinda M",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=MM"
        }
      },
      "doctorData": {
        "doctorsName": "Malinda M",
        "zipcode": "94143",
        "practiceName": "UCSF",
        "speciality": "Pediatrics",
        "degree": "M.D.",
        "spec1": "Pediatrics",
        "spec2": null,
        "spec3": null,
        "addressCity": "San Francisco",
        "state": "CA",
        "phone": "4154761000"
      }
    }
  },
  {
    "node": {
      "id": "U3RldmVuIEhlYWxzLTEwOTIzNA==",
      "title": "Dr. Susan S",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=SS"
        }
      },
      "doctorData": {
        "doctorsName": "Susan S",
        "zipcode": "94143",
        "practiceName": "UCSF",
        "speciality": "Pediatrics",
        "degree": "M.D.",
        "spec1": "Pediatrics",
        "spec2": null,
        "spec3": null,
        "addressCity": "San Francisco",
        "state": "CA",
        "phone": "4154761000"
      }
    }
  },
  {
    "node": {
      "id": "TWljaGFlbCBCb3lsZS0xMDkzMA==",
      "title": "Dr. Thomas F",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=TF"
        }
      },
      "doctorData": {
        "doctorsName": "Thomas F",
        "zipcode": "94143",
        "practiceName": "UCSF",
        "speciality": "Pediatric Infectious Diseases",
        "degree": "M.D.",
        "spec1": "Pediatric Infectious Diseases",
        "spec2": null,
        "spec3": null,
        "addressCity": "San Francisco",
        "state": "CA",
        "phone": "4153532813"
      }
    }
  },
  {
    "node": {
      "id": "RGF2aWQgV2VsbHMtMTEwOTI=",
      "title": "Dr. Kenneth G",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=KG"
        }
      },
      "doctorData": {
        "doctorsName": "Kenneth G",
        "zipcode": "94609",
        "practiceName": "UCSF",
        "speciality": "Pediatric Infectious Diseases",
        "degree": "M.D.",
        "spec1": "Pediatric Infectious Diseases",
        "spec2": null,
        "spec3": null,
        "addressCity": "Oakland",
        "state": "CA",
        "phone": "5104283838"
      }
    }
  },
  {
    "node": {
      "id": "RHVwaGFuIEthZGlhbS0xMTExMA==",
      "title": "Dr. Mark H",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=MH"
        }
      },
      "doctorData": {
        "doctorsName": "Mark H",
        "zipcode": "94143",
        "practiceName": "UCSF",
        "speciality": "Pediatric Infectious Diseases",
        "degree": "M.D.",
        "spec1": "Pediatric Infectious Diseases",
        "spec2": null,
        "spec3": null,
        "addressCity": "San Francisco",
        "state": "CA",
        "phone": "4153532813"
      }
    }
  },
  {
    "node": {
      "id": "SmFtZXMgS2FydC0xMTU0OTk=",
      "title": "Dr. Brian R",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=BR"
        }
      },
      "doctorData": {
        "doctorsName": "Brian R",
        "zipcode": "94143",
        "practiceName": "UCSF",
        "speciality": "Pediatric Infectious Diseases",
        "degree": "M.D.",
        "spec1": "Pediatric Infectious Diseases",
        "spec2": null,
        "spec3": null,
        "addressCity": "San Francisco",
        "state": "CA",
        "phone": "4153532813"
      }
    }
  },
  {
    "node": {
      "id": "QnJpYW4gUGV0ZXJzb24tMTE1NjY=",
      "title": "Dr. William C",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=WC"
        }
      },
      "doctorData": {
        "doctorsName": "William C",
        "zipcode": "94598",
        "practiceName": "Muir Orthopaedic Specialists",
        "speciality": "Orthopaedic Surgery",
        "degree": "M.D.",
        "spec1": "Orthopaedic Surgery",
        "spec2": null,
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259398585"
      }
    }
  },
  {
    "node": {
      "id": "TWljaGFlbCBNYWxsZXR0ZS0xMjc0NzAwMA==",
      "title": "Dr. Andrew W",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=AW"
        }
      },
      "doctorData": {
        "doctorsName": "Andrew W",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "QWxhbiBBc3Npc3QtMTQ0MDMx",
      "title": "Dr. Joseph S",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=JS"
        }
      },
      "doctorData": {
        "doctorsName": "Joseph S",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "TWljaGFlbCBNYWxsZXR0ZS0xMjc0NzAwMA==",
      "title": "Dr. David M",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=DM"
        }
      },
      "doctorData": {
        "doctorsName": "David M",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "TWFsaW5kYSBGbGVtc3Rlci0xMDQyNzE=",
      "title": "Dr. Robert S",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=RS"
        }
      },
      "doctorData": {
        "doctorsName": "Robert S",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "U3RlcGhhbiBDaGVuLTEwNDkz",
      "title": "Dr. David A",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=DA"
        }
      },
      "doctorData": {
        "doctorsName": "David A",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "SmFtZXMgTWlsbGVyLTEwNTIy",
      "title": "Dr. William C",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=WC"
        }
      },
      "doctorData": {
        "doctorsName": "William C",
        "zipcode": "94598",
        "practiceName": "Muir Orthopaedic Specialists",
        "speciality": "Orthopaedic Surgery",
        "degree": "M.D.",
        "spec1": "Orthopaedic Surgery",
        "spec2": null,
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259398585"
      }
    }
  },
  {
    "node": {
      "id": "Sm9obiBIYWxsaW5nLTEwNTQ5MA==",
      "title": "Dr. Joseph S",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=JS"
        }
      },
      "doctorData": {
        "doctorsName": "Joseph S",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "TWljaGFlbCBNYWRlcmEtMTA1NTQ=",
      "title": "Dr. David M",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=DM"
        }
      },
      "doctorData": {
        "doctorsName": "David M",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "RW1pbHkgS2VuZGFsbC0xMDYxNTY=",
      "title": "Dr. Robert S",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=RS"
        }
      },
      "doctorData": {
        "doctorsName": "Robert S",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "U3RldmVuIE1hdGhlcnMtMTA3MjA4",
      "title": "Dr. David A",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=DA"
        }
      },
      "doctorData": {
        "doctorsName": "David A",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "TWF0dGhldyBHaWxwYXRyaWNrLTEwNzc1",
      "title": "Dr. Stephen B",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=SB"
        }
      },
      "doctorData": {
        "doctorsName": "Stephen B",
        "zipcode": "94553",
        "practiceName": "BASS Medical Group",
        "speciality": "Internal Medicine",
        "degree": "M.D.",
        "spec1": "Internal Medicine",
        "spec2": null,
        "spec3": null,
        "addressCity": "Pacheco",
        "state": "CA",
        "phone": "9256801999"
      }
    }
  },
  {
    "node": {
      "id": "UmF2aSBFZ2FuLUd1cnUgMTA3NzUy",
      "title": "Dr. Joseph S",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=JS"
        }
      },
      "doctorData": {
        "doctorsName": "Joseph S",
        "zipcode": "94609",
        "practiceName": "UCSF",
        "speciality": "Pediatrics",
        "degree": "M.D.",
        "spec1": "Pediatrics",
        "spec2": null,
        "spec3": null,
        "addressCity": "Oakland",
        "state": "CA",
        "phone": "5104283838"
      }
    }
  },
  {
    "node": {
      "id": "U3RlZmFuIEtpbGxpbmdzLTEwODcxNQ==",
      "title": "Dr. Daniel W",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=DW"
        }
      },
      "doctorData": {
        "doctorsName": "Daniel W",
        "zipcode": "94609",
        "practiceName": "UCSF",
        "speciality": "Pediatrics",
        "degree": "M.D.",
        "spec1": "Pediatrics",
        "spec2": null,
        "spec3": null,
        "addressCity": "Oakland",
        "state": "CA",
        "phone": "5104283838"
      }
    }
  },
  {
    "node": {
      "id": "QnJpYW4gUGFya2VyLTEwODg2NA==",
      "title": "Dr. Jennifer N",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=JN"
        }
      },
      "doctorData": {
        "doctorsName": "Jennifer N",
        "zipcode": "94143",
        "practiceName": "UCSF",
        "speciality": "Pediatrics",
        "degree": "M.D.",
        "spec1": "Pediatrics",
        "spec2": null,
        "spec3": null,
        "addressCity": "San Francisco",
        "state": "CA",
        "phone": "4154761000"
      }
    }
  },
  {
    "node": {
      "id": "U3RlcGhlbiBHdWRlbWFuLTEwODkwMg==",
      "title": "Dr. Malinda M",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=MM"
        }
      },
      "doctorData": {
        "doctorsName": "Malinda M",
        "zipcode": "94143",
        "practiceName": "UCSF",
        "speciality": "Pediatrics",
        "degree": "M.D.",
        "spec1": "Pediatrics",
        "spec2": null,
        "spec3": null,
        "addressCity": "San Francisco",
        "state": "CA",
        "phone": "4154761000"
      }
    }
  },
  {
    "node": {
      "id": "U3RldmVuIEhlYWxzLTEwOTIzNA==",
      "title": "Dr. Susan S",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=SS"
        }
      },
      "doctorData": {
        "doctorsName": "Susan S",
        "zipcode": "94143",
        "practiceName": "UCSF",
        "speciality": "Pediatrics",
        "degree": "M.D.",
        "spec1": "Pediatrics",
        "spec2": null,
        "spec3": null,
        "addressCity": "San Francisco",
        "state": "CA",
        "phone": "4154761000"
      }
    }
  },
  {
    "node": {
      "id": "TWljaGFlbCBCb3lsZS0xMDkzMA==",
      "title": "Dr. Stephanie B",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=SB"
        }
      },
      "doctorData": {
        "doctorsName": "Stephanie B",
        "zipcode": "94553",
        "practiceName": "BASS Medical Group",
        "speciality": "Internal Medicine",
        "degree": "M.D.",
        "spec1": "Internal Medicine",
        "spec2": null,
        "spec3": null,
        "addressCity": "Pacheco",
        "state": "CA",
        "phone": "9256801999"
      }
    }
  },
  {
    "node": {
      "id": "RGF2aWQgV2VsbHMtMTEwOTI=",
      "title": "Dr. Thomas F",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=TF"
        }
      },
      "doctorData": {
        "doctorsName": "Thomas F",
        "zipcode": "94143",
        "practiceName": "UCSF",
        "speciality": "Pediatric Infectious Diseases",
        "degree": "M.D.",
        "spec1": "Pediatric Infectious Diseases",
        "spec2": null,
        "spec3": null,
        "addressCity": "San Francisco",
        "state": "CA",
        "phone": "4153532813"
      }
    }
  },
  {
    "node": {
      "id": "RHVwaGFuIEthZGlhbS0xMTExMA==",
      "title": "Dr. Kenneth G",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=KG"
        }
      },
      "doctorData": {
        "doctorsName": "Kenneth G",
        "zipcode": "94609",
        "practiceName": "UCSF",
        "speciality": "Pediatric Infectious Diseases",
        "degree": "M.D.",
        "spec1": "Pediatric Infectious Diseases",
        "spec2": null,
        "spec3": null,
        "addressCity": "Oakland",
        "state": "CA",
        "phone": "5104283838"
      }
    }
  },
  {
    "node": {
      "id": "SmFtZXMgS2FydC0xMTU0OTk=",
      "title": "Dr. Mark H",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=MH"
        }
      },
      "doctorData": {
        "doctorsName": "Mark H",
        "zipcode": "94143",
        "practiceName": "UCSF",
        "speciality": "Pediatric Infectious Diseases",
        "degree": "M.D.",
        "spec1": "Pediatric Infectious Diseases",
        "spec2": null,
        "spec3": null,
        "addressCity": "San Francisco",
        "state": "CA",
        "phone": "4153532813"
      }
    }
  },
  {
    "node": {
      "id": "QnJpYW4gUGV0ZXJzb24tMTE1NjY=",
      "title": "Dr. Brian R",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=BR"
        }
      },
      "doctorData": {
        "doctorsName": "Brian R",
        "zipcode": "94143",
        "practiceName": "UCSF",
        "speciality": "Pediatric Infectious Diseases",
        "degree": "M.D.",
        "spec1": "Pediatric Infectious Diseases",
        "spec2": null,
        "spec3": null,
        "addressCity": "San Francisco",
        "state": "CA",
        "phone": "4153532813"
      }
    }
  },
  {
    "node": {
      "id": "QXJ2aW5kIENob3VkcnktMTU4NDg=",
      "title": "Dr. William C",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=WC"
        }
      },
      "doctorData": {
        "doctorsName": "William C",
        "zipcode": "94598",
        "practiceName": "Muir Orthopaedic Specialists",
        "speciality": "Orthopaedic Surgery",
        "degree": "M.D.",
        "spec1": "Orthopaedic Surgery",
        "spec2": null,
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259398585"
      }
    }
  },
  {
    "node": {
      "id": "SmFtZXMgRG9lLTE1OTgwMA==",
      "title": "Dr. Andrew W",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=AW"
        }
      },
      "doctorData": {
        "doctorsName": "Andrew W",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "U3RlcGhhbiBDaGVuLTEwNDkz",
      "title": "Dr. Joseph S",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=JS"
        }
      },
      "doctorData": {
        "doctorsName": "Joseph S",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "SmFtZXMgTWlsbGVyLTEwNTIy",
      "title": "Dr. David M",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=DM"
        }
      },
      "doctorData": {
        "doctorsName": "David M",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "Sm9obiBIYWxsaW5nLTEwNTQ5MA==",
      "title": "Dr. Robert S",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=RS"
        }
      },
      "doctorData": {
        "doctorsName": "Robert S",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "TWljaGFlbCBNYWRlcmEtMTA1NTQ=",
      "title": "Dr. David A",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=DA"
        }
      },
      "doctorData": {
        "doctorsName": "David A",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "RW1pbHkgS2VuZGFsbC0xMDYxNTY=",
      "title": "Dr. John M",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=JM"
        }
      },
      "doctorData": {
        "doctorsName": "John M",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "U3RldmVuIE1hdGhlcnMtMTA3MjA4",
      "title": "Dr. Edward J",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=EJ"
        }
      },
      "doctorData": {
        "doctorsName": "Edward J",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "TWF0dGhldyBHaWxwYXRyaWNrLTEwNzc1",
      "title": "Dr. David A",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=DA"
        }
      },
      "doctorData": {
        "doctorsName": "David A",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "UmF2aSBFZ2FuLUd1cnUgMTA3NzUy",
      "title": "Dr. James C",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=JC"
        }
      },
      "doctorData": {
        "doctorsName": "James C",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "U3RlZmFuIEtpbGxpbmdzLTEwODcxNQ==",
      "title": "Dr. James C",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=JC"
        }
      },
      "doctorData": {
        "doctorsName": "James C",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "QnJpYW4gUGFya2VyLTEwODg2NA==",
      "title": "Dr. David W",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=DW"
        }
      },
      "doctorData": {
        "doctorsName": "David W",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "U3RlcGhlbiBHdWRlbWFuLTEwODkwMg==",
      "title": "Dr. Edward J",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=EJ"
        }
      },
      "doctorData": {
        "doctorsName": "Edward J",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "U3RldmVuIEhlYWxzLTEwOTIzNA==",
      "title": "Dr. David A",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=DA"
        }
      },
      "doctorData": {
        "doctorsName": "David A",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "TWljaGFlbCBCb3lsZS0xMDkzMA==",
      "title": "Dr. John M",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=JM"
        }
      },
      "doctorData": {
        "doctorsName": "John M",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "RGF2aWQgV2VsbHMtMTEwOTI=",
      "title": "Dr. David A",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=DA"
        }
      },
      "doctorData": {
        "doctorsName": "David A",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "RHVwaGFuIEthZGlhbS0xMTExMA==",
      "title": "Dr. James C",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=JC"
        }
      },
      "doctorData": {
        "doctorsName": "James C",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "SmFtZXMgS2FydC0xMTU0OTk=",
      "title": "Dr. James C",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=JC"
        }
      },
      "doctorData": {
        "doctorsName": "James C",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "QnJpYW4gUGV0ZXJzb24tMTE1NjY=",
      "title": "Dr. David W",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=DW"
        }
      },
      "doctorData": {
        "doctorsName": "David W",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "QWxhbiBBc3Npc3QtMTQ0MDMx",
      "title": "Dr. Edward J",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=EJ"
        }
      },
      "doctorData": {
        "doctorsName": "Edward J",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "TWljaGFlbCBNYWxsZXR0ZS0xMjc0NzAwMA==",
      "title": "Dr. John M",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=JM"
        }
      },
      "doctorData": {
        "doctorsName": "John M",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "TWFsaW5kYSBGbGVtc3Rlci0xMDQyNzE=",
      "title": "Dr. David A",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=DA"
        }
      },
      "doctorData": {
        "doctorsName": "David A",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "U3RlcGhhbiBDaGVuLTEwNDkz",
      "title": "Dr. James C",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=JC"
        }
      },
      "doctorData": {
        "doctorsName": "James C",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "SmFtZXMgTWlsbGVyLTEwNTIy",
      "title": "Dr. James C",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=JC"
        }
      },
      "doctorData": {
        "doctorsName": "James C",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "Sm9obiBIYWxsaW5nLTEwNTQ5MA==",
      "title": "Dr. David W",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=DW"
        }
      },
      "doctorData": {
        "doctorsName": "David W",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "TWljaGFlbCBNYWRlcmEtMTA1NTQ=",
      "title": "Dr. Edward J",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=EJ"
        }
      },
      "doctorData": {
        "doctorsName": "Edward J",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "RW1pbHkgS2VuZGFsbC0xMDYxNTY=",
      "title": "Dr. John M",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=JM"
        }
      },
      "doctorData": {
        "doctorsName": "John M",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "U3RldmVuIE1hdGhlcnMtMTA3MjA4",
      "title": "Dr. David A",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=DA"
        }
      },
      "doctorData": {
        "doctorsName": "David A",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "TWF0dGhldyBHaWxwYXRyaWNrLTEwNzc1",
      "title": "Dr. James C",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=JC"
        }
      },
      "doctorData": {
        "doctorsName": "James C",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "UmF2aSBFZ2FuLUd1cnUgMTA3NzUy",
      "title": "Dr. James C",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=JC"
        }
      },
      "doctorData": {
        "doctorsName": "James C",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "U3RlZmFuIEtpbGxpbmdzLTEwODcxNQ==",
      "title": "Dr. David W",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=DW"
        }
      },
      "doctorData": {
        "doctorsName": "David W",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "QnJpYW4gUGFya2VyLTEwODg2NA==",
      "title": "Dr. Edward J",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=EJ"
        }
      },
      "doctorData": {
        "doctorsName": "Edward J",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "U3RlcGhlbiBHdWRlbWFuLTEwODkwMg==",
      "title": "Dr. John M",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=JM"
        }
      },
      "doctorData": {
        "doctorsName": "John M",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "U3RldmVuIEhlYWxzLTEwOTIzNA==",
      "title": "Dr. David A",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=DA"
        }
      },
      "doctorData": {
        "doctorsName": "David A",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "TWljaGFlbCBCb3lsZS0xMDkzMA==",
      "title": "Dr. James C",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=JC"
        }
      },
      "doctorData": {
        "doctorsName": "James C",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "RGF2aWQgV2VsbHMtMTEwOTI=",
      "title": "Dr. James C",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=JC"
        }
      },
      "doctorData": {
        "doctorsName": "James C",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "RHVwaGFuIEthZGlhbS0xMTExMA==",
      "title": "Dr. David W",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=DW"
        }
      },
      "doctorData": {
        "doctorsName": "David W",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "SmFtZXMgS2FydC0xMTU0OTk=",
      "title": "Dr. Edward J",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=EJ"
        }
      },
      "doctorData": {
        "doctorsName": "Edward J",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "QnJpYW4gUGV0ZXJzb24tMTE1NjY=",
      "title": "Dr. John M",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=JM"
        }
      },
      "doctorData": {
        "doctorsName": "John M",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "QXJ2aW5kIENob3VkcnktMTU4NDg=",
      "title": "Dr. David A",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=DA"
        }
      },
      "doctorData": {
        "doctorsName": "David A",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "SmFtZXMgRG9lLTE1OTgwMA==",
      "title": "Dr. James C",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=JC"
        }
      },
      "doctorData": {
        "doctorsName": "James C",
        "zipcode": "94598",
        "practiceName": "Sutter Health",
        "speciality": "Neurology",
        "degree": "M.D.",
        "spec1": "Neurology",
        "spec2": "Vascular Neurology",
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259417900"
      }
    }
  },
  {
    "node": {
      "id": "VGlmZmFueSBIdXItMTYzMDA0",
      "title": "Dr. Tiffany Hur",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=TH"
        }
      },
      "doctorData": {
        "doctorsName": "Tiffany Hur",
        "zipcode": "94609",
        "practiceName": "Bay Children's Physicians",
        "speciality": "Pediatrics",
        "degree": "M.D.",
        "spec1": "Pediatrics",
        "spec2": null,
        "spec3": null,
        "addressCity": "Oakland",
        "state": "CA",
        "phone": "5104283590"
      }
    }
  },
  {
    "node": {
      "id": "QnJpYW4gUGV0ZXJzb24tMTE1NjY=",
      "title": "Dr. Stephanie B",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=SB"
        }
      },
      "doctorData": {
        "doctorsName": "Stephanie B",
        "zipcode": "94553",
        "practiceName": "BASS Medical Group",
        "speciality": "Internal Medicine",
        "degree": "M.D.",
        "spec1": "Internal Medicine",
        "spec2": null,
        "spec3": null,
        "addressCity": "Pacheco",
        "state": "CA",
        "phone": "9256801999"
      }
    }
  },
  {
    "node": {
      "id": "TWljaGFlbCBNYWxsZXR0ZS0xMjc0NzAwMA==",
      "title": "Dr. Robert P",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=RP"
        }
      },
      "doctorData": {
        "doctorsName": "Robert P",
        "zipcode": null,
        "practiceName": null,
        "speciality": "Nephrology",
        "degree": "M.D.",
        "spec1": "Nephrology",
        "spec2": "Internal Medicine",
        "spec3": null,
        "addressCity": null,
        "state": null,
        "phone": null
      }
    }
  },
  {
    "node": {
      "id": "QWxhbiBBc3Npc3QtMTQ0MDMx",
      "title": "Dr. Michael Re",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=MR"
        }
      },
      "doctorData": {
        "doctorsName": "Michael Re",
        "zipcode": "94598",
        "practiceName": "Muir Orthopaedic Specialists",
        "speciality": "Orthopaedic Surgery",
        "degree": "M.D.",
        "spec1": "Orthopaedic Surgery",
        "spec2": null,
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259398585"
      }
    }
  },
  {
    "node": {
      "id": "RHVwaGFuIEthZGlhbS0xMTExMA==",
      "title": "Dr. Stephanie B",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=SB"
        }
      },
      "doctorData": {
        "doctorsName": "Stephanie B",
        "zipcode": "94553",
        "practiceName": "BASS Medical Group",
        "speciality": "Internal Medicine",
        "degree": "M.D.",
        "spec1": "Internal Medicine",
        "spec2": null,
        "spec3": null,
        "addressCity": "Pacheco",
        "state": "CA",
        "phone": "9256801999"
      }
    }
  },
  {
    "node": {
      "id": "VGlmZmFueSBIdXItMTYzMDA0",
      "title": "Dr. Tiffany Hur",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=TH"
        }
      },
      "doctorData": {
        "doctorsName": "Tiffany Hur",
        "zipcode": "94609",
        "practiceName": "Bay Children's Physicians",
        "speciality": "Pediatrics",
        "degree": "M.D.",
        "spec1": "Pediatrics",
        "spec2": null,
        "spec3": null,
        "addressCity": "Oakland",
        "state": "CA",
        "phone": "5104283590"
      }
    }
  },
  {
    "node": {
      "id": "QnJpYW4gUGV0ZXJzb24tMTE1NjY=",
      "title": "Dr. Stephanie B",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=SB"
        }
      },
      "doctorData": {
        "doctorsName": "Stephanie B",
        "zipcode": "94553",
        "practiceName": "BASS Medical Group",
        "speciality": "Internal Medicine",
        "degree": "M.D.",
        "spec1": "Internal Medicine",
        "spec2": null,
        "spec3": null,
        "addressCity": "Pacheco",
        "state": "CA",
        "phone": "9256801999"
      }
    }
  },
  {
    "node": {
      "id": "TWljaGFlbCBNYWxsZXR0ZS0xMjc0NzAwMA==",
      "title": "Dr. Robert P",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=RP"
        }
      },
      "doctorData": {
        "doctorsName": "Robert P",
        "zipcode": null,
        "practiceName": null,
        "speciality": "Nephrology",
        "degree": "M.D.",
        "spec1": "Nephrology",
        "spec2": "Internal Medicine",
        "spec3": null,
        "addressCity": null,
        "state": null,
        "phone": null
      }
    }
  },
  {
    "node": {
      "id": "QWxhbiBBc3Npc3QtMTQ0MDMx",
      "title": "Dr. Michael Re",
      "featuredImage": {
        "node": {
          "sourceUrl": "https://placehold.co/64x64/E2E8F0/1A202C?text=MR"
        }
      },
      "doctorData": {
        "doctorsName": "Michael Re",
        "zipcode": "94598",
        "practiceName": "Muir Orthopaedic Specialists",
        "speciality": "Orthopaedic Surgery",
        "degree": "M.D.",
        "spec1": "Orthopaedic Surgery",
        "spec2": null,
        "spec3": null,
        "addressCity": "Walnut Creek",
        "state": "CA",
        "phone": "9259398585"
      }
    }
  }
];

  // State to manage the search term input by the user.
  const [searchTerm, setSearchTerm] = useState('');
  // States for the new search fields.
  const [zipcode, setZipcode] = useState('');
  const [practiceName, setPracticeName] = useState('');
  const [speciality, setSpeciality] = useState('');

  // States for pagination.
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage] = useState(6);
  
  // State to store all filtered and sorted doctors.
  const [doctors, setDoctors] = useState([]);
  // State for the doctors to be displayed on the current page.
  const [paginatedDoctors, setPaginatedDoctors] = useState([]);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // The updated and complete list of specialities for the autocomplete feature.
  const specialitiesList = [
    'Acute Care Nurse Practioner',
    'Addiction Medicine',
    'Adolescent Medicine',
    'Adult Health Nurse Practitioner',
    'Advanced Heart Failure and Transplant Cardiology',
    'Allergy and Immunology',
    'Anesthesiology Physician',
    'Anesthesiology/Pain Medicine',
    'Applied Behavioral Analyst',
    'Audiology',
    'Bariatric Medicine',
    'Bariatric Surgery',
    'Bloodbanking/Transfusion Medicine',
    'Cardiac Electrophysiology',
    'Cardiothoracic Vascular Surgery',
    'Cardiovascular Disease',
    'Certified Ocularist / Dispensing Optician',
    'Certified Professional Midwife',
    'Child and Adolescent Psychiatry',
    'Chiropractor',
    'Clinical Cardiac Electrophysiology',
    'Clinical Child & Adolescent Psychologist',
    'Clinical Informatics',
    'Clinical Neurophysiology',
    'Clinical Pathology',
    'Clinical Social Worker',
    'Colon & Rectal Surgery',
    'Complex Pediatric Otolaryngology',
    'Critical Care Medicine',
    'Cytopathology',
    'Dermatology',
    'Dermatology Micrographic Surgery',
    'Dermatopathology',
    'Developmental-Behavioral Pediatrics',
    'Diagnostic Radiology',
    'Electrodiagnostic Medicine',
    'Emergency Medicine',
    'Endocrinology',
    'Endocrinology, Diabetes and Metabolism',
    'Epilepsy',
    'Family Medicine',
    'Foot and Ankle Surgery',
    'Gastroenterology',
    'General Dentistry',
    'General Practice',
    'General Surgery',
    'Genetics, Clinical (MD)',
    'Geriatric Medicine',
    'Gynecological Oncology',
    'Gynecology',
    'Hand Surgery',
    'Health Service Psychologist',
    'Hearing Instrument Specialist',
    'Hematology',
    'Hematology & Oncology',
    'Hepatology',
    'Hospice and Palliative Medicine',
    'Hospitalist',
    'Infectious Disease',
    'Inpatient Manager',
    'Integrative Medicine',
    'Internal Medicine',
    'Marriage & Family Therapy',
    'Maternal-Fetal Medicine',
    'Medical Biochemical Genetics',
    'Medical Oncology',
    'Medical Physician Assistant',
    'Neonatal-Perinatal Medicine',
    'Nephrology',
    'Neurological Surgery',
    'Neurology',
    'Neurology with Special Qualification in Child Neurology',
    'Neuromuscular Medicine',
    'Neuropsychology',
    'Neuropsychology, Clinical',
    'Neuroradiology',
    'Nuclear Medicine',
    'Nurse Anesthetist',
    'Nutritionists/ Dietitians',
    'Obstetrics',
    'Obstetrics and Gynecology',
    'Occupational Medicine',
    'Occupational Therapy',
    'Ophthalmology',
    'Optometrist',
    'Oral and Maxillofacialy Surgery',
    'Orthopaedic Sports Medicine',
    'Orthopaedic Surgery',
    'Orthopaedic Trauma',
    'Otolaryngology – Head and Neck Surgery',
    'Otolaryngology/Facial Plastic Surgery',
    'Pain Medicine',
    'Pathology - Anatomic',
    'Pathology - Anatomic/Pathology - Clinical',
    'Pathology – Anatomic/Pathology - Clinical',
    'Pathology-Medical Microbiology',
    'Pediatric Allergy & Immunology',
    'Pediatric Anesthesiology',
    'Pediatric Cardiology',
    'Pediatric Critical Care Medicine',
    'Pediatric Dermatology',
    'Pediatric Emergency Medicine',
    'Pediatric Endocrinology',
    'Pediatric Gastroenterology',
    'Pediatric Hematology-Oncology',
    'Pediatric Infectious Diseases',
    'Pediatric Nephrology',
    'Pediatric Neurosurgery',
    'Pediatric Ophthalmology',
    'Pediatric Orthopaedic Surgery',
    'Pediatric Pulmonology',
    'Pediatric Radiology',
    'Pediatric Rehabilitation Medicine',
    'Pediatric Rheumatology',
    'Pediatric Sports Medicine',
    'Pediatric Surgery',
    'Pediatric Urology',
    'Pediatrics',
    'Pediatrics, Developmental Behavioral',
    'Pharmacist',
    'Pharmacology, Clinical',
    'Physical Medicine and Rehabilitation',
    'Physical Therapy',
    'Plastic and Reconstructive Surgery',
    'Plastic Surgery',
    'Podiatry',
    'Podiatry, General Practice',
    'Primary Care Grp/Prac',
    'Professional Counselor',
    'Psychiatry',
    'Psychiatry and Neurology, Behavioral Neurology & Neuropsychiatry',
    'Psychology, Clinical',
    'Psychology, Health',
    'Psychosomatic Medicine',
    'Public Health & General Preventive Medicine',
    'Pulmonary Disease',
    'Radiation Oncology',
    'Radiology, Interventional and Diagnostic',
    'Radiology, Therapeutic',
    'Reference Labs',
    'Registered Dietitian',
    'Registered Nurse',
    'Registered Nurse, Lactation Consultant',
    'Reproductive Endocrinology',
    'Retina Specialist',
    'Rheumatology',
    'Sleep Medicine',
    'Speech Language Pathologist',
    'Speech Pathologist',
    'Sports Medicine',
    'Surgery',
    'Surgery of the Hand',
    'Surgery, Orthopedic, Adult Reconstructive',
    'Surgical Critical Care',
    'Surgical Oncology',
    'Thoracic Surgery/Cardiothoracic Vascular Surgery',
    'Transplant Surgery',
    'Urgent Care',
    'Urology',
    'Urology, Pediatric',
    'Vascular and Interventional Radiology',
    'Vascular Surgery'
  ];
  const [specialitySuggestions, setSpecialitySuggestions] = useState([]);

  /**
   * Helper function for a simple fuzzy match.
   * Checks if characters of the search term appear in order in the target string.
   * @param {string} searchString - The user's input.
   * @param {string} targetString - The string to search within.
   * @returns {boolean} - True if there's a fuzzy match, false otherwise.
   */
  const fuzzyMatch = (searchString, targetString) => {
    // If the search string is empty, it's considered a match.
    if (!searchString) return true;
    
    // Convert both strings to lowercase for case-insensitive matching.
    const lowerSearch = searchString.toLowerCase();
    const lowerTarget = targetString.toLowerCase();
    
    let searchIndex = 0;
    let targetIndex = 0;
    
    // Iterate through the target string to find characters from the search string.
    while (searchIndex < lowerSearch.length && targetIndex < lowerTarget.length) {
      if (lowerSearch[searchIndex] === lowerTarget[targetIndex]) {
        searchIndex++;
      }
      targetIndex++;
    }
    
    // If we've found all characters of the search string in order, it's a match.
    return searchIndex === lowerSearch.length;
  };

  /**
   * This useEffect hook handles filtering and sorting the dummy data.
   * It is triggered whenever any of the search state variables change.
   */
  useEffect(() => {
    // Check if any of the search fields have a value.
    const hasSearchTerm = searchTerm.length >= 3;
    const hasZipcode = zipcode !== '';
    const hasPracticeName = practiceName !== '';
    const hasSpeciality = speciality !== '';
    const isSearching = hasSearchTerm || hasZipcode || hasPracticeName || hasSpeciality;

    let filteredDoctors = [];

    if (isSearching) {
      // Filter the dummy data based on the search criteria.
      filteredDoctors = dummyDoctors.filter(({ node }) => {
        const nameMatch = hasSearchTerm ? fuzzyMatch(searchTerm, node.doctorData?.doctorsName) : true;
        const practiceMatch = hasPracticeName ? fuzzyMatch(practiceName, node.doctorData?.practiceName) : true;
        const zipcodeMatch = hasZipcode ? node.doctorData?.zipcode.includes(zipcode) : true;
        // Updated logic to use fuzzyMatch for the speciality field.
        const specialityMatch = hasSpeciality ? fuzzyMatch(speciality, node.doctorData?.speciality) : true;
        
        return nameMatch && zipcodeMatch && practiceMatch && specialityMatch;
      });
    } else {
      // If not searching, show only the first 12 doctors by default.
      filteredDoctors = dummyDoctors.slice(0, 12);
    }
    
    // Sort the doctors alphabetically by name.
    const sortedDoctors = [...filteredDoctors].sort((a, b) => {
        const nameA = a.node.doctorData?.doctorsName || "";
        const nameB = b.node.doctorData?.doctorsName || "";
        return nameA.localeCompare(nameB);
    });

    setDoctors(sortedDoctors);
    setCurrentPage(1); // Reset to the first page on a new action.
  }, [searchTerm, zipcode, practiceName, speciality]);

  /**
   * This useEffect hook handles pagination.
   * It is triggered when the `doctors` array or `currentPage` changes.
   */
  useEffect(() => {
    // Calculate the start and end index for slicing the results array.
    const lastIndex = currentPage * resultsPerPage;
    const firstIndex = lastIndex - resultsPerPage;
    const currentResults = doctors.slice(firstIndex, lastIndex);
    setPaginatedDoctors(currentResults);
  }, [doctors, currentPage, resultsPerPage]);

  // Handle input changes for the speciality autocomplete.
  const handleSpecialityChange = (event) => {
    const value = event.target.value;
    setSpeciality(value);
    if (value) {
      const filteredSuggestions = specialitiesList.filter(s =>
        s.toLowerCase().startsWith(value.toLowerCase())
      );
      setSpecialitySuggestions(filteredSuggestions);
    } else {
      setSpecialitySuggestions([]);
    }
  };

  // Select a speciality from the suggestions.
  const handleSelectSpeciality = (selectedSpeciality) => {
    setSpeciality(selectedSpeciality);
    setSpecialitySuggestions([]); // Hide suggestions after selection.
  };

  // Handle pagination changes.
  const totalPages = Math.ceil(doctors.length / resultsPerPage);

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle potential errors during the query.
  if (error) {
    return <p className="text-red-500 p-4 font-sans">Error fetching doctors: {error}</p>;
  }

  const isSearching = searchTerm.length >= 3 || zipcode !== '' || practiceName !== '' || speciality !== '';

  return (
    <div className="p-8 bg-gray-100 min-h-screen font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Find a Doctor</h1>
        
        {/* Search input fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by doctor's name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
          <input
            type="text"
            placeholder="Search by zipcode..."
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
            className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
          <input
            type="text"
            placeholder="Search by practice name..."
            value={practiceName}
            onChange={(e) => setPracticeName(e.target.value)}
            className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
          {/* Autocomplete speciality input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search by speciality..."
              value={speciality}
              onChange={handleSpecialityChange}
              className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
            {specialitySuggestions.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-48 overflow-y-auto shadow-lg">
                {specialitySuggestions.map(s => (
                  <li
                    key={s}
                    onClick={() => handleSelectSpeciality(s)}
                    className="p-3 hover:bg-gray-200 cursor-pointer"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Display a loading message while data is being filtered locally. */}
        {loading && (
          <p className="text-center text-lg text-gray-500">Searching...</p>
        )}

        {/* Display the search results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {paginatedDoctors.length > 0 ? (
            paginatedDoctors.map(({ node }) => {
              // Create a comma-separated string of specialities, filtering out null/empty values.
              const specialities = [
                node.doctorData?.spec1,
                node.doctorData?.spec2,
                node.doctorData?.spec3
              ]
              .filter(s => s) // Filter out any falsey values (null, "", etc.).
              .join(', ');
              
              // Define the full address string.
              const fullAddress = `${node.doctorData?.addressCity}, ${node.doctorData?.state} ${node.doctorData?.zipcode}`;

              return (
                <div key={node.id} className="bg-gray-50 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center">
                    {node.featuredImage?.node?.sourceUrl && (
                      <img
                        src={node.featuredImage.node.sourceUrl}
                        alt={node.doctorData?.doctorsName || node.title}
                        className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-gray-300"
                        onError={(e) => {
                          // In case the image fails to load, replace it with a placeholder.
                          e.target.onerror = null;
                          e.target.src = "https://placehold.co/64x64/E2E8F0/1A202C?text=No+Img";
                        }}
                      />
                    )}
                    <div>
                      {/* Display the doctor's name from the custom field. */}
                      <h2 className="text-xl font-semibold text-gray-900">
                        {node.doctorData?.doctorsName || node.title}, {node.doctorData?.degree}
                      </h2>
                      {/* Display the comma-separated specialities */}
                      {specialities && <p className="text-md text-gray-700">{specialities}</p>}
                      <p className="text-sm text-gray-500">{node.doctorData?.practiceName}</p>
                      {/* Display the full address */}
                      <p className="text-sm text-gray-500">{fullAddress}</p>
                      <p className="text-sm text-gray-500">Phone: {node.doctorData?.phone}</p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            // Display a message if no doctors are found after a search.
            (isSearching && !loading) && (
              <p className="text-center text-gray-500 col-span-3">No doctors found matching your search criteria.</p>
            )
          )}
        </div>

        {/* Pagination controls */}
        {doctors.length > resultsPerPage && (
          <div className="flex justify-center items-center mt-6 space-x-4">
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 text-lg font-semibold text-gray-700 bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors duration-200"
            >
              Previous
            </button>
            <span className="text-lg text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-lg font-semibold text-gray-700 bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors duration-200"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default DoctorSearchApp;
