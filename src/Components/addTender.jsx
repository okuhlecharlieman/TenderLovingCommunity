import React, { useState } from "react";
import approveTransaction from './../ethers.js'

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
  const [complianceDetails, setComplianceDetails] = useState(null); // Track compliance details for modal
  const [showModal, setShowModal] = useState(false);
  const [contractExecuted, setContractExecuted] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleSelect = async (rowIndex) => {
    // Assuming contractAddress is the deployed multi-sig contract
    const contractAddress = "0xYourDeployedContractAddress";
    const isExecuted = await approveTransaction(contractAddress);

    if (isExecuted) {
      // Show compliance check after approvals
      checkCompliance(rowIndex);
      setContractExecuted(true);
    } else {
      alert("Waiting for more signatures...");
    }
  };

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

  const handleMultiSig = (selectedSubmission) => {
    // Simulate multi-sig contract check
    const signaturesCollected = 3; // Mock signatures collected count
    if (signaturesCollected >= 3) {
      const { compliance, details } = checkCompliance(selectedSubmission);
      setMultiSigStatus(compliance);
      setComplianceDetails(details); // Store details for viewing later
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

    const checkCompliance = (rowIndex) => {
      const selectedEntry = formData[rowIndex];
      const compliance = checkComplianceStatus(selectedEntry);
      setSelectedRow({ ...selectedEntry, compliance });
    };
  const checkComplianceStatus  = (submission) => {
    const target = submissions[0]; // HeyCent
    // let compliance = 100;
    const details = {
      compliant: [],
      nonCompliant: [],
    };

    const compliance = {
      status: "compliant",
      details: [],
    };
  
    // Check each field and update compliance status
    if (submission.budget !== target.budget) {
      compliance.status = "non-compliant";
      compliance.details.push("Budget mismatch");
    }
    if (submission.duration !==target.duration) {
      compliance.status = "non-compliant";
      compliance.details.push("Duration mismatch");
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
      {contractExecuted ? (
        <div>
          {/* Show compliance data here */}
          {selectedRow?.compliance?.status === "compliant" ? (
            <div>Compliant: {selectedRow.compliance.details}</div>
          ) : (
            <div>Non-Compliant: {selectedRow.compliance.details}</div>
          )}
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Budget</th>
              <th>Duration</th>
              <th>Material 1</th>
              <th>Material 2</th>
              <th>Select</th>
            </tr>
          </thead>
          <tbody>
            {formData.map((item, index) => (
              <tr key={index}>
                <td>{item.budget}</td>
                <td>{item.duration}</td>
                <td>{item.material1Name}</td>
                <td>{item.material2Name}</td>
                <td>
                  <button onClick={() => handleSelect(index)}>Select</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}


export default AddTender;
