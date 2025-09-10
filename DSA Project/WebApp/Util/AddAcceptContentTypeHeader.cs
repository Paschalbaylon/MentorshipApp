using System;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace WebApp.Util;

public class AddAcceptContentTypeHeader : IOperationFilter
{
    public void Apply(OpenApiOperation operation, OperationFilterContext context)
    {
        //Add accept Header
        operation.Parameters.Add(new OpenApiParameter
        {
            Name = "Accept",
            In = ParameterLocation.Header,
            Required = false,
            Description = "Set the content of the request body (e.g., application/json, application/xml)",
            Schema = new OpenApiSchema { Type = "string" }
        });

        //add content-Type Header (for request body)
        operation.Parameters.Add(new OpenApiParameter
        {
            Name = "Content-Type",
            In = ParameterLocation.Header,
            Required = false,
            Description = "Set the content of the request body (e.g., application/json, application/xml)",
            Schema = new OpenApiSchema { Type = "string" }
        });
    }
}

