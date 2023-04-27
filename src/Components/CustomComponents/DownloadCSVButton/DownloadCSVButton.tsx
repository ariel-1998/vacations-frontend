import "./DownloadCSVButton.css";
import { FaDownload } from "react-icons/fa"
import Papa from "papaparse";
import saveAs from "file-saver";
import { likeService } from "../../../services/likeServices";
import { notifyService } from "../../../services/notifyService";
import { useState } from "react";


function DownloadCSVButton(): JSX.Element {

    const [loading, setLoading] = useState(false)

    const downloadCSV = async () => {
        setLoading(true)
        try {
            const data = await likeService.getVacationLikesReports()
            const csvData = Papa.unparse(data);
            const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
            saveAs(blob, 'data.csv');
        } catch (error) {
            notifyService.error(error)
        }
        setLoading(false)
    }

    return (
        <button 
        onClick={!loading ? downloadCSV : () => null}
        className={`download-button ${!loading ? 'download' : 'disabled'}`}>Download reports

        <span>
            <FaDownload 
            color="green" size={50} />
        </span>
        </button>

    );
}

export default DownloadCSVButton;
