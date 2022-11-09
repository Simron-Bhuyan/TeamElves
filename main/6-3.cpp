/******************************
        Author : Simron Bhuyan
        ID : B520053
******************************/

#include <iostream>

using namespace std;

class complexNumber {
	double real {0}, imaginary {0};
	friend complexNumber sum(complexNumber, complexNumber);
public:
	void getData()
	{
		cout << "Real Part = ";
		cin >> real;
		cout << "Imaginary Part = ";
		cin >> imaginary;
	}
	void show()
	{
		cout << real << "\t+\t" << imaginary << "i\n";
	}
};

complexNumber sum(complexNumber a, complexNumber b)
{
	complexNumber result;
	result.real = a.real + b.real;
	result.imaginary = a.imaginary + b.imaginary;
	return result;
}

int main(int argc, char const *argv[])
{
	complexNumber a, b;
	cout << "\n+++++++++++++++++++++++++++++++++++\n";
	cout << "\tFirst Number\n";
	a.getData();
	cout << "\n++++++++++++++++++++++++++++++++++++\n";
	cout << "\tSecond Number\n";
	b.getData();
	cout << "\n+++++++++++++++++++++++++++++++++++++\n";
	cout << "Sum =\t";
	sum(a, b).show();
	cout << "\n++++++++++++++++++++++++++++++++++++++\n\n.";
	return 0;
}