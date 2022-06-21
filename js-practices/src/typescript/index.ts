type ARR = "a" | "b" | "c";
type Result = Extract<ARR, "b">;

const obj = {
	"a1": "a1",
	"a2": "a2",
	"b": "b",
} as const;

// https://www.youtube.com/watch?v=z7thLMrTrZs&list=PLIvujZeVDLMx040-j1W4WFs1BxuTGdI_b&index=17
type ExtractAllAs<
	Obj,
	_ExtractedKeys extends keyof Obj = Extract<keyof Obj, `a${string}`>,
> = {
	[K in _ExtractedKeys]: Obj[K];
}[_ExtractedKeys]; // you can map over key obj keys

type NewUnion = ExtractAllAs<typeof obj>;
