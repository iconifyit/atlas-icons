import { useState } from "react";
import styles from "./GetNotifiedInput.module.scss";
import LoadingSpinner from "../LoadingSpinner";
import useInput from "../../../hooks/use-input";
import { toast } from "react-toastify";
import http from "../../../services/httpService";
import { BASE_URL } from '../../../shared/baseUrl';

const GetNotifiedInput = () => {
  const [loading, setLoading] = useState(false);
  const baseUrl = BASE_URL;
  const {
    value: emailVal,
    isValid: emailIsValid,
    hasError: emailHasError,
    reset: resetEmailInput,
    valueChangeHandler: emailChangedHandler,
  } = useInput((value) => value.includes("@"));

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    if (!emailIsValid || emailHasError) {
      toast.error(`Please enter a valid email`);
      return;
    }

    setLoading(true);
    http
    .post(`${baseUrl}mail-list`, { email: emailVal })
    // axios
    //   .post("/api/email", )
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          resetEmailInput();
          setLoading(false);
          toast.success(`You've been successfully subscribed!`);
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error(`An error occurred`);
      });
  };

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={styles.mailListInput}>
        <input
          placeholder="Receive more freebies and updates"
          name="email"
          id="email"
          onChange={emailChangedHandler}
          value={emailVal}
        />
        <div className={styles.absoluteDiv}>
          <button
            disabled={loading}
            className="flex items-center justify-center"
          >
            {loading && (
              <span className="absolute">
                <LoadingSpinner />
              </span>
            )}
            <span className={loading ? "opacity-0" : ""}>Get Notified</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default GetNotifiedInput;
