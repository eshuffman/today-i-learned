using System;

namespace EmFacts.Utilities.HttpResponseExceptions
{
    /// <summary>
    /// A custom exception for handling internal server errors.
    /// </summary>
    [Serializable]
    public class InternalServerException : Exception, IHttpResponseException
    {
        public InternalServerException(string message)
        {
            Value = new(status: 500, error: "Internal Server Error", message: message);
        }
        public HttpResponseExceptionValue Value { get; set; }
    }
}
