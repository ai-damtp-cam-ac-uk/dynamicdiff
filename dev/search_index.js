var documenterSearchIndex = {"docs":
[{"location":"api/","page":"API","title":"API","text":"CurrentModule = DynamicDiff","category":"page"},{"location":"api/#DynamicDiff","page":"API","title":"DynamicDiff","text":"","category":"section"},{"location":"api/","page":"API","title":"API","text":"Documentation for DynamicDiff.","category":"page"},{"location":"api/","page":"API","title":"API","text":"","category":"page"},{"location":"api/","page":"API","title":"API","text":"Modules = [DynamicDiff]","category":"page"},{"location":"api/#DynamicDiff.OperatorDerivative","page":"API","title":"DynamicDiff.OperatorDerivative","text":"OperatorDerivative{F,degree,arg} <: Function\n\nA callable type representing the partial derivative of an operator. Takes either one (degree=1) or two (degree=2) scalar arguments. Returns a scalar.\n\nParameters\n\nF: The type of the original operator\ndegree: The arity of the operator (1 for unary, 2 for binary)\narg: Which argument to take the derivative with respect to\n\nFields\n\nop: The actual function performing the partial derivative.\n\n\n\n\n\n","category":"type"},{"location":"api/#DynamicDiff.D-Tuple{DynamicExpressions.ExpressionModule.AbstractExpression, Integer}","page":"API","title":"DynamicDiff.D","text":"D(ex::AbstractExpression, feature::Integer)\n\nCompute the derivative of ex with respect to the feature-th variable. Returns a new expression with an expanded set of operators.\n\n\n\n\n\n","category":"method"},{"location":"api/#DynamicDiff.operator_derivative-Union{Tuple{arg}, Tuple{degree}, Tuple{F}, Tuple{F, Val{degree}, Val{arg}}} where {F, degree, arg}","page":"API","title":"DynamicDiff.operator_derivative","text":"operator_derivative(op::F, ::Val{degree}, ::Val{arg}) where {F,degree,arg}\n\nCreate a partial derivative operator of a given function op with respect to argument arg.\n\nArguments\n\nop: The operator to differentiate\ndegree: The arity of the operator (1 for unary, 2 for binary)\narg: Which argument to take the derivative with respect to\n\n\n\n\n\n","category":"method"},{"location":"#Introduction","page":"Home","title":"Introduction","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"<img src=\"logo.png\" width=\"300\" alt=\"logo\">","category":"page"},{"location":"","page":"Home","title":"Home","text":"(Image: Dev) (Image: Build Status) (Image: Coverage)","category":"page"},{"location":"","page":"Home","title":"Home","text":"(Image: DispatchDoctor) (Image: Aqua)","category":"page"},{"location":"","page":"Home","title":"Home","text":"DynamicDiff.jl provides compilation-free symbolic differentiation for runtime-generated expressions.","category":"page"},{"location":"","page":"Home","title":"Home","text":"Built for SymbolicRegression.jl, it is also a generic library for computing derivatives.","category":"page"},{"location":"#The-Derivative-Operator,-D","page":"Home","title":"The Derivative Operator, D","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"This operator computes symbolic partial derivatives of any AbstractExpression object (from DynamicExpressions.jl).","category":"page"},{"location":"","page":"Home","title":"Home","text":"D(ex::AbstractExpression, feature::Integer)","category":"page"},{"location":"","page":"Home","title":"Home","text":"This works by extending the OperatorEnum contained within ex to include the additional derivative operators (one-time compilation for a given set of operators), and then manipulating the symbolic tree to reference the new operators and compute chain rule compositions.","category":"page"},{"location":"","page":"Home","title":"Home","text":"Evaluation then can simply call the result with standard DynamicExpressions.jl syntax, which uses the fast DynamicExpressions.eval_tree_array function.","category":"page"},{"location":"","page":"Home","title":"Home","text":"This operator can be nested an arbitrary number of times.","category":"page"},{"location":"#Performance","page":"Home","title":"Performance","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Let's see an example.","category":"page"},{"location":"","page":"Home","title":"Home","text":"First, let's set up some variables with a given set of operators:","category":"page"},{"location":"","page":"Home","title":"Home","text":"using DynamicDiff, DynamicExpressions\n\noperators = OperatorEnum(; binary_operators=(+, *, /, -), unary_operators=(sin, cos));\nvariable_names = [\"x1\", \"x2\", \"x3\"];\nx1, x2, x3 = (Expression(Node{Float64}(feature=i); operators, variable_names) for i in 1:3);","category":"page"},{"location":"","page":"Home","title":"Home","text":"Now, we can generate some symbolic functions and take derivatives:","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia> f = x1 * sin(x2 - 0.5)\nx1 * sin(x2 - 0.5)\n\njulia> D(f, 1)\nsin(x2 - 0.5)\n\njulia> D(f, 2)\nx1 * cos(x2 - 0.5)","category":"page"},{"location":"","page":"Home","title":"Home","text":"These symbolic derivatives are done by simply incrementing integers and arranging a binary tree, so this process is very fast:","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia> using BenchmarkTools\n\njulia> @btime D($f, 2);\n  52.865 ns (5 allocations: 240 bytes)","category":"page"},{"location":"","page":"Home","title":"Home","text":"This isn't compiled or cached! To show this, let's randomly generate arbitrary expressions and then take derivatives of them:","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia> @btime D(g, 1) setup=(g = [x1, x2, x3][rand(1:3)] * sin([x1, x2, x3][rand(1:3)] - randn())) evals=100\n  60.270 ns (2 allocations: 80 bytes)","category":"page"},{"location":"","page":"Home","title":"Home","text":"These expressions can then be evaluated using DynamicExpressions.jl:","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia> df = D(f, 1);\n\njulia> df([1.0 2.0]')\n1-element Vector{Float64}:\n 0.9974949866040544","category":"page"},{"location":"","page":"Home","title":"Home","text":"This is also very fast. Let's take the symbolic derivative of an expression and then evaluate it on 32 batches:","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia> @btime D($f, 1)(x) setup=(x = randn(2, 32));\n  187.132 ns (4 allocations: 416 bytes)","category":"page"},{"location":"#Contents","page":"Home","title":"Contents","text":"","category":"section"}]
}
