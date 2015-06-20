rm -f rm -f python.tcz
rm -rf /home/docker/.local/bin/fig
wget http://www.tinycorelinux.net/5.x/x86/tcz/python.tcz && tce-load -clsi python.tcz && rm -f python.tcz
curl -LO https://bitbucket.org/pypa/setuptools/raw/bootstrap/ez_setup.py && sudo /usr/local/bin/python2.7 ez_setup.py && rm -f ez_setup.py
sudo /usr/local/bin/easy_install-2.7 pip
sudo /usr/local/bin/pip2.7 install -U fig