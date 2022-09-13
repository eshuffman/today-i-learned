using System;

namespace EmFacts.Utilities.HttpResponseExceptions
{
    /// <summary>
    /// A custom exception for resource not found errors.
    /// </summary>
    [Serializable]
    public class NotFoundException : Exception, IHttpResponseException
    {
        public NotFoundException(string message)
        {
            Value = new(status: 404, error: "Not Found", message: message);
        }
        public HttpResponseExceptionValue Value { get; set; }
    }
}
