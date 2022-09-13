using System;

namespace EmFacts.Utilities.HttpResponseExceptions
{
    /// <summary>
    /// A custom exception for bad request errors.
    /// </summary>
    [Serializable]
    public class BadRequestException : Exception, IHttpResponseException
    {
        public BadRequestException(string message)
        {
            Value = new(status: 400, error: "Bad Request", message: message);
        }
        public HttpResponseExceptionValue Value { get; set; }
    }
}
