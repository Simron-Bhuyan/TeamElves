// // Author : Simron Bhuyan
// // ID : b520053

// #include <cmath>
// #include <iostream>
// using namespace std;

// class quadEquation {
// 	int a{0};
// 	int b{0};
// 	int c{0};

// public:
// 	void getData();
// 	void showData();
// };

// inline void quadEquation::getData() {
// 	cout << "a : ";
// 	cin >> a;
// 	cout << "b : ";
// 	cin >> b;
// 	cout << "c : ";
// 	cin >> c;
// }

// inline void quadEquation::showData() {
// 	cout << "\n-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-\n";
// 	cout << "\tEquation : " << a << "x^2  +  " << b << "x  +  " << c;
// 	cout << "\n-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-\n";
// 	if ((b * b - 4 * a * c) == 0) {
// 		cout << "\nThe given equation have real and identical roots" << endl;
// 		cout << "\n\tRoot = " << -(b / (2 * a)) << endl;
// 	} else if ((b * b - 4 * a * c) > 0) {
// 		cout << "\nThe given equation have real and distinct roots" << endl;
// 		cout << "\n\tRoot-1 = " << -((b + sqrt(b * b - 4 * a * c)) / (2 * a));
// 		cout << "\n\tRoot-2 = " << -((b - sqrt(b * b - 4 * a * c)) / (2 * a)) << endl;
// 	} else {
// 		cout << "\nThe given equation have imaginary and conjugate roots" << endl;
// 		cout << "\n\tRoot-1 = " << -(b / (2 * a)) << " + " << (sqrt(-(b * b - 4 * a * c))) / 2 * a << "i";
// 		cout << "\n\tRoot-1 = " << -(b / (2 * a)) << " - " << (sqrt(-(b * b - 4 * a * c))) / 2 * a << "i" << endl;
// 	}
// 	cout << "\n-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-\n";
// }

// int main(int argc, char const *argv[]) {
// 	auto Quad_Equation = new quadEquation();
// 	Quad_Equation->getData();
// 	Quad_Equation->showData();
// 	return 0;
// }
/******************************
        Author : Simron Bhuyan
        ID : B520053
******************************/

#include <iostream>
using namespace std;

class manufacture {
	int mfgyr, expyr;
public:
	manufacture(int MFGYR, int EXPYR)
	{
		mfgyr = MFGYR;
		expyr = EXPYR;
	}
	manufacture()
	{
		mfgyr = expyr = 0;
	}
	int cal_year()
	{
		return expyr - mfgyr;
	}
	void showData()
	{
		cout << "Year of manufacture : " << mfgyr << endl;
		cout << "Year of expiry : " << expyr << endl;
		if (cal_year() > 1)
		{
			cout << "\tTotal Life of Product : " << cal_year() << " years ." << endl;
		}
		else
		{
			cout << "\tTotal Life of Product : " << cal_year() << " year ." << endl;
		}

	}
};

int main(int argc, char const *argv[])
{
	auto product = new manufacture(2021, 2025);
	cout << "++++++++++++++++++++++++++++++++++++++\n\n";
	product->showData();
	cout << "\n++++++++++++++++++++++++++++++\n\n";
	return 0;
}