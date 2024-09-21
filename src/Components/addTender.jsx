import React, { useState } from "react";
import approveTransaction from "./../ethers";
import getRequiredApprovals from "./../ethers";
import getCountApprovals from "./../ethers"; // Assume ethers.js handles the multi-sig contract

function AddTender() {
  const [formData, setFormData] = useState({
    budget: "",
    duration: "",
    material1Name: "",
    material1Price: "",
    material2Name: "",
    material2Price: "",
  });
  const [showTable, setShowTable] = useState(false);
  const [multiSigStatus, setMultiSigStatus] = useState(null);
  const [complianceDetails, setComplianceDetails] = useState(null);
  const [showModal, setShowModal] = useState(false); // For showing compliance details
const [comName, setName] = useState('');
  // Predefined array with 5 entries
  const submissions = [
    {
      budget: "40000",
      duration: "15",
      material1Name: "rocks",
      material1Price: "10000",
      material2Name: "cement",
      material2Price: "10000",
      name: "HeyCent",
    },
    {
      budget: "50000",
      duration: "8",
      material1Name: "rocks",
      material1Price: "10000",
      material2Name: "cement",
      material2Price: "10000",
      name: "HeyBuild",
    },
    {
      budget: "40000",
      duration: "10",
      material1Name: "rocks",
      material1Price: "1000",
      material2Name: "cement",
      material2Price: "1000",
      name: "HeyCost",
    },
    {
      budget: "33000",
      duration: "20",
      material1Name: "rocks",
      material1Price: "12000",
      material2Name: "cement",
      material2Price: "13000",
      name: "HeyTrust",
    },
    {
      budget: "40000",
      duration: "15",
      material1Name: "rocks",
      material1Price: "22000",
      material2Name: "cement",
      material2Price: "22000",
      name: "HeyChamp",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowTable(true);
  };

  // const handleMultiSig = async (selectedSubmission) => {
  //   const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace with your actual contract address
  //   const isExecuted = await approveTransaction(contractAddress);
  //   const isCount = await getCountApprovals(contractAddress);
  //   const isRequiredCount = await getRequiredApprovals(contractAddress);

  //   if (isExecuted && isCount >= isRequiredCount) {
  //     const { compliance, details } = checkCompliance(selectedSubmission);
  //     setMultiSigStatus(compliance);
  //     setComplianceDetails(details);
  //     setShowModal(true); // Show compliance details after multi-sig
  //   } else {
  //     alert("Multi-sig process is still pending!");
  //   }
  // };

  const handleMultiSig = (selectedSubmission) => {
    // Simulate multi-sig contract check
    const signaturesCollected = 3; // Mock signatures collected count
    if (signaturesCollected >= 3) {
      const { compliance, details } = checkCompliance(selectedSubmission);
      setMultiSigStatus(compliance);
      setComplianceDetails(details); // Store details for viewing later
      setShowTable(false)
      setName(selectedSubmission.name);
      
    } else {
      alert("Multi-sig process is still pending!");
    }
  };

  // Function to filter top 3 matches based on budget proximity and material names
  const filteredSubmissions = submissions
    .filter((submission) => {
      const enteredBudget = parseFloat(formData.budget) || 0;
      const submissionBudget = parseFloat(submission.budget) || 0;
      const material1Match =
        submission.material1Name.toLowerCase() ===
        formData.material1Name.toLowerCase();
      const material2Match =
        submission.material2Name.toLowerCase() ===
        formData.material2Name.toLowerCase();
      const budgetClose =
        Math.abs(enteredBudget - submissionBudget) <= enteredBudget * 0.1;
      return budgetClose && material1Match && material2Match;
    })
    .sort((a, b) => {
      const enteredBudget = parseFloat(formData.budget) || 0;
      return (
        Math.abs(enteredBudget - parseFloat(a.budget)) -
        Math.abs(enteredBudget - parseFloat(b.budget))
      );
    })
    .slice(0, 3);

  const checkCompliance = (submission) => {
    const target = submissions[0]; // HeyCent
    let compliance = 100;
    const details = { compliant: [], nonCompliant: [] };

    if (submission.budget !== target.budget) {
      compliance -= 20;
      details.nonCompliant.push("Budget");
    } else {
      details.compliant.push("Budget");
    }

    if (submission.duration !== target.duration) {
      compliance -= 10;
      details.nonCompliant.push("Duration");
    } else {
      details.compliant.push("Duration");
    }

    if (
      submission.material1Name !== target.material1Name ||
      submission.material1Price !== target.material1Price
    ) {
      compliance -= 30;
      details.nonCompliant.push("Material 1");
    } else {
      details.compliant.push("Material 1");
    }

    if (
      submission.material2Name !== target.material2Name ||
      submission.material2Price !== target.material2Price
    ) {
      compliance -= 30;
      details.nonCompliant.push("Material 2");
    } else {
      details.compliant.push("Material 2");
    }

    return {
      compliance:
        compliance >= 80
          ? `Compliant: ${compliance}%`
          : `Non-compliant: ${compliance}%`,
      details,
    };
  };

  return (
    <>
      <div className="grid place-content-center">
        <div className="p-6 text-3xl flex">
          <div className="avatar avatar-ring-secondary size-40">
            <img
              src="https://lh3.googleusercontent.com/kLJ-sJyAeopZG6wT3usuXrGx7lFykg_L683arsMJppDuFJ-4fhzsbZ1h38PNyG7PBPU"
              width={250}
              alt="South African Government"
            />
          </div>
          <p className="px-6 py-14">South African Government</p>
        </div>

        {/* Form */}
        <div className="card p-3">
          {!showTable && !multiSigStatus && !showModal &&(
            <form
              onSubmit={handleSubmit}
              className="mx-auto flex w-full max-w-sm flex-col gap-6"
            >
              <div className="flex flex-col items-center">
                <h1 className="text-3xl font-semibold">Add Tender</h1>
                <p className="text-sm">
                  Please enter the tender's specifications
                </p>
              </div>
              <div className="form-group">
                <div className="form-field">
                  <label className="form-label">Budget R(ZAR)</label>
                  <div className="form-control">
                    <input
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      placeholder="Type here"
                      type="text"
                      className="input max-w-full"
                    />
                  </div>
                </div>
                <div className="form-field">
                  <label className="form-label">
                    Duration/Lead Time (No. of Days)
                  </label>
                  <div className="form-control">
                    <input
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      placeholder="Type here"
                      type="number"
                      className="input max-w-full"
                    />
                  </div>
                </div>
                <div className="form-field">
                  <label className="form-label">Material 1 Name</label>
                  <div className="form-control">
                    <input
                      name="material1Name"
                      value={formData.material1Name}
                      onChange={handleChange}
                      placeholder="Type here"
                      type="text"
                      className="input max-w-full"
                    />
                  </div>
                </div>
                <div className="form-field">
                  <label className="form-label">Material 1 Price</label>
                  <div className="form-control">
                    <input
                      name="material1Price"
                      value={formData.material1Price}
                      onChange={handleChange}
                      placeholder="Type here"
                      type="number"
                      className="input max-w-full"
                    />
                  </div>
                </div>
                <div className="form-field">
                  <label className="form-label">Material 2 Name</label>
                  <div className="form-control">
                    <input
                      name="material2Name"
                      value={formData.material2Name}
                      onChange={handleChange}
                      placeholder="Type here"
                      type="text"
                      className="input max-w-full"
                    />
                  </div>
                </div>
                <div className="form-field">
                  <label className="form-label">Material 2 Price</label>
                  <div className="form-control">
                    <input
                      name="material2Price"
                      value={formData.material2Price}
                      onChange={handleChange}
                      placeholder="Type here"
                      type="number"
                      className="input max-w-full"
                    />
                  </div>
                </div>
                <div className="form-field pt-5">
                  <div className="form-control grid place-content-center">
                    <button type="submit" className="btn btn-secondary">
                      Create
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Table */}
        {showTable && (
          <div className="card p-3">
            <h2 className="text-2xl font-semibold">
              Top 3 Matching Submissions
            </h2>
            <table className="table-auto w-full mt-4">
              <thead>
                <tr>
                  <th className="px-4 py-2">Budget</th>
                  <th className="px-4 py-2">Duration</th>
                  <th className="px-4 py-2">Material 1</th>
                  <th className="px-4 py-2">Material 1 Price</th>
                  <th className="px-4 py-2">Material 2</th>
                  <th className="px-4 py-2">Material 2 Price</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubmissions.map((submission, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{submission.budget}</td>
                    <td className="border px-4 py-2">{submission.duration}</td>
                    <td className="border px-4 py-2">
                      {submission.material1Name}
                    </td>
                    <td className="border px-4 py-2">
                      {submission.material1Price}
                    </td>
                    <td className="border px-4 py-2">
                      {submission.material2Name}
                    </td>
                    <td className="border px-4 py-2">
                      {submission.material2Price}
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        className="btn btn-primary"
                        onClick={() => handleMultiSig(submission)}
                      >
                        Select
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
     {multiSigStatus && (
              <div className="mt-4">
                <p className="text-xl font-semibold">Company Name: {comName}</p>
                <h3 className="text-xl font-semibold">
                  {multiSigStatus}{" "}
                  <a
                    href="#"
                    onClick={() => setShowModal(true)}
                    className="text-blue-500 underline"
                  >
                    View
                  </a>
                </h3>
              </div>
            )}
        {/* Compliance Modal */}
        {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-semibold mb-4">Compliance Details</h2>
            <div>
              <h3 className="text-lg font-semibold">Compliant Areas</h3>
              <ul className="list-disc pl-5">
                {complianceDetails?.compliant.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <h3 className="text-lg font-semibold mt-4">
                Non-compliant Areas
              </h3>
              <ul className="list-disc pl-5">
                {complianceDetails?.nonCompliant.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 btn btn-secondary"
            >
              Close
            </button>
          </div>
        </div>
      )}
      </div>
    </>
  );
}

export default AddTender;
